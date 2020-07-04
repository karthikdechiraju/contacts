import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHeadComponent from "../components/tableHead";
import { getContacts, createContact, updateContact, deleteContact } from '../utils/httpUtils'
import { dateModifier } from "../utils/dateModifier";
import LongMenu from '../components/floatingMenu'
import EditModal from "./modal";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Snackbar } from '../components/snackbar'




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: 100
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

const rowsPerPage = 10

const ContactsTable = (props) => {
    
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([])
    const [data, setData] = React.useState([])
    const [isModalVisible, setModalVisibility] = React.useState(false)
    const [activeContact, setActiveContact] = React.useState(null)
    const [error, setError] = React.useState({
        isError: false,
        message: ""
    })
    
    
    useEffect(() => {
        getContacts().then(res => {
            setRows(res.data.data)
            setData(res.data.data)
        })
    },[]);

    useEffect(()=>{
        if(props.search !== ""){
            let newRows = rows.filter(item => item.name.includes(props.search) || item.email.includes(props.search))
            setRows(newRows)
        }else{
            setRows(data)
        }
    },[props.search,data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onEdit = (data) => {
        setActiveContact(data)
        setModalVisibility(true)
    }


    const showSnackBar = (isError, message) => {
        setError({
            isError,
            message
        })
        setTimeout(()=>{
            setError({
                isError: false,
                message: ""
            })
        },5000)
    }

    const onDelete = (data) => {
        deleteContact(data._id).then(res=>{
            let newRows = rows.filter(item => item._id !== data._id)
            setRows(newRows)
            showSnackBar(false,"contact deleted successfully")
        }).catch(e =>{
            showSnackBar(true,e.response && e.response.data && e.response.data.error ? e.response.data.error : "Something went wrong")
        })
    }


    const handleSubmit = (data) => {
        if(activeContact){
            // update
            updateContact(data).then(res => {
                let newRows = rows.map(item => {
                    if(item._id === data._id){
                        return res.data.data
                    }else{
                        return item
                    }
                })
                setRows(newRows)
                setActiveContact(null)
                setModalVisibility(false)
                showSnackBar(false,"contact updated successfully")
            }).catch(e => {
                setActiveContact(null)
                setModalVisibility(false)
                showSnackBar(true,e.response && e.response.data && e.response.data.error ? e.response.data.error : "Something went wrong")
            })
        }else{
            // create
            createContact(data).then(res => {
                let newRows = [res.data.data,...rows]
                setRows(newRows)
                setActiveContact(null)
                setModalVisibility(false)
                showSnackBar(false,"contact created successfully")
            }).catch(e => {
                showSnackBar(true,e.response && e.response.data && e.response.data.error ? e.response.data.error : "Something went wrong")
                setActiveContact(null)
                setModalVisibility(false)
            })
        }
    }
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Snackbar isError={error.isError} message={error.message} />
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        aria-label="enhanced table"
                    >
                        <TableHeadComponent
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                                .map(row => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={row.name} >
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell >{row.country_code}</TableCell>
                                            <TableCell >{dateModifier(row.created_at)}</TableCell>
                                            <TableCell style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}>
                                                {dateModifier(row.updated_at)}
                                                <LongMenu onDelete={onDelete} onEdit={onEdit} data={row} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                />
            </Paper>
            <EditModal 
                open={isModalVisible}
                data={activeContact}
                handleClose={() => {
                    setModalVisibility(false)
                    setActiveContact(null)
                }}
                handleSubmit={handleSubmit}
            />
            <div style={{position:"fixed", zIndex: 9999, bottom: 30, right: 30}}>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    onClick={() => setModalVisibility(true)}
                >
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
};

export default ContactsTable;