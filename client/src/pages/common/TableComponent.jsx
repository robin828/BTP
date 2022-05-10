import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
const columns = [
  { id: 'sNo', label: 'S.No', align: 'left', minWidth: 170 },
  { id: 'title', label: 'Title', align: 'center', minWidth: 100 },
  {
    id: 'typeOfVideo',
    label: 'Video Type',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'topic',
    label: 'Topic',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'button',
    label: '',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'button1',
    label: '',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

// if(localStorage.getItem('admin')==='true') {
//   function createData(name, code, population, size, density) {
//     // const density = population / size;
//     return { name, code, population, size, density};
//   }
// }



function createData(name, code, population, size, density) {
  // const density = population / size;
  return { name, code, population, size, density};
}
const Butt = (
  <>
  <Button style={{backgroundColor: '#FA5523', color: '#ffffff', fontWeight: '800', borderRadius: '19px', fontSize: '14px', fontFamily: 'poppins'}} >View</Button>
  </>
)
const Butt1 = (
  <>
  <Button style={{backgroundColor: '#FA5523', color: '#ffffff', fontWeight: '800', borderRadius: '19px', fontSize: '14px', fontFamily: 'poppins'}} >Analysis</Button>
  </>
)


export default function TableComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useHistory()
  const [rows, setRows] = React.useState([]);
  const url = "http://class.chartr.in:5000"
  // const url = "http://localhost:5000"

  React.useEffect(()=>{
    Axios.get(`${url}/api/videos`).then(res=>{
      // setRows(res.data)
      // let arr = [];
      // if(localStorage.getItem('admin')==='true') {
      //   res.data.map((r, i)=>{
      //     r["sNo"] = i+1;
      //     r["button"] = Butt
      //   })
      // }
      res.data.map((r, i)=>{
        r["sNo"] = i+1;
        r["button"] = Butt
      })
      // console.log(arr)
      console.log(res.data)
      setRows(res.data);
    });

    // rorows

  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#5375E2' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => {
                    history.push(
                        `/videos/${row._id}`
                    )
                }} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                          <>
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


