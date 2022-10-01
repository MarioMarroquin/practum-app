import React from "react";
import { client } from "../../config/environment";
import {
  Button,
} from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const findData = async () => {
    try {
      await client.get("process").then((res) => {
        let list = res?.data?.data;
        setData(list);
      });
    } catch (error) {
      console.log("🚀 ~ file: index.jsx ~ line 55 ~ findUsers ~ error", error);
    }
  };

  const columns = data.groups.map(d => {
    return {
      field: d.name,
      headerName: d.name,
      flex: 0.75,
    }
  });

  const rows = data.areas.map(a => {
    return {
      field: a.name,
      headerName: a.name,
      flex: 0.75,
    }
  })

  return <div style={{display: 'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
              <h1>Practum</h1>
              <Button>Anadir +</Button>
            </div>
            <div>
            <Paper sx={{ width: '100%' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={1}>
                        Knowledge Areas
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        Process Groups
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
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
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
            </div>
    </div>;

};

export default Dashboard;
