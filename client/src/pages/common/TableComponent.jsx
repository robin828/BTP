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
];



function createData(name, code, population, size, density) {
  // const density = population / size;
  return { name, code, population, size, density};
}


// const rows = [
//   createData('1', 'Class', 1324171354, 3287263, Butt),
//   createData('2', 'CN', 1403500365, 9596961, Butt),
//   createData('3', 'IT', 60483973, 301340, Butt),
//   createData('4', 'US', 327167434, 9833520, Butt),
//   createData('5', 'CA', 37602103, 9984670, Butt),
//   createData('6', 'AU', 25475400, 7692024, Butt),
//   createData('7', 'DE', 83019200, 357578, Butt),
//   createData('8', 'IE', 4857000, 70273, Butt),
//   createData('9', 'MX', 126577691, 1972550, Butt),
// //   createData('Japan', 'JP', 126317000, 377973),
// //   createData('France', 'FR', 67022000, 640679),
// //   createData('United Kingdom', 'GB', 67545757, 242495),402.82
// //   createData('Russia', 'RU', 146793744, 17098246),
// //   createData('Nigeria', 'NG', 200962417, 923768),
// //   createData('Brazil', 'BR', 210147125, 8515767),
// ];
// const rows = [
//     {'sNo': '1','title': 'Class Recording','date': '22/10/2022', 'Topic': 'Signal and Systems'},
    
//   //   createData('Japan', 'JP', 126317000, 377973),
//   //   createData('France', 'FR', 67022000, 640679),
//   //   createData('United Kingdom', 'GB', 67545757, 242495),402.82
//   //   createData('Russia', 'RU', 146793744, 17098246),
//   //   createData('Nigeria', 'NG', 200962417, 923768),
//   //   createData('Brazil', 'BR', 210147125, 8515767),
//   ];
const Butt = (
  <>
  <Button style={{backgroundColor: '#FA5523', color: '#ffffff', fontWeight: '800', borderRadius: '19px', fontSize: '14px', fontFamily: 'poppins'}} >View</Button>
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
    Axios.get('${url}/api/videos').then(res=>{
      // setRows(res.data)
      // let arr = [];
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

  // console.log(rows)


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
