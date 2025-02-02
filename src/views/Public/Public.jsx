import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import first_place from '../common/resources/first_place.svg';
import second_place from '../common/resources/second_place.svg';
import third_place from '../common/resources/third_place.svg';

import './_style.css';
import RequireAuth from '../../auth/RequireAuth';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

let id = 0;
function createData(place, name, points, viewtime) {
  id += 1;
  return { id, place, name, points, viewtime };
}

function generateStringColor(string) {
  const num = hashCode(string);
  return intToRGB(num);
}
function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const rows = [
  createData(1, 'Blechkelle', 512, '24h 31m'),
  createData(2, 'mekalix', 128, '20h 15m'),
  createData(3, 'DieserMerlin', 64, '19h 10m'),
  createData(4, 'Larcce', 32, '15h 5m'),
  createData(5, 'Spendendose', 16, '10h 1m')
];

class Public extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <RequireAuth optional>
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Befehle" />
            <Tab label="Streamzitate" />
            <Tab label="Bestenliste" />
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer>
          <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Befehl</TableCell>
                  <TableCell>Ausgabe</TableCell>
                  <TableCell>Zugriffslevel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>
                      !twasi
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      Twasi ist ein für Streamer entwickelter, modularer Chatbot. Twasi ist der erste gehostete Chatbot für Twitch, der selbst geschriebene Plugins unterstützt.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label="Moderatoren" color="primary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TabContainer>}
        {value === 1 && <TabContainer></TabContainer>}
        {value === 2 && <TabContainer>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <Paper className="pageContainer">
                <Chip
                  color="primary"
                  avatar={<Avatar>5</Avatar>}
                  label="Punkte jede Minute"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px' }}>
                <Table>
                  <TableHead>
                    <TableRow className="TableRow">
                      <TableCell>Platzierung</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Punkte</TableCell>
                      <TableCell>Zugeschaute Zeit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {(() => {
                            switch (row.place) {
                              case 1: return ( <div className="rank_trophy">
                                <img
                                  style={{ height: '32px' }}
                                  src={first_place}
                                  alt="first_place"
                                />
                              </div>);
                              case 2: return ( <img
                                className="rank_trophy_two"
                                style={{ height: '32px' }}
                                src={second_place}
                                alt="second_place"
                              />);
                              case 3: return ( <img
                                className="rank_trophy_three"
                                style={{ height: '32px' }}
                                src={third_place}
                                alt="third_place"
                              />);
                              default: return ( <Chip
                                label={row.place}
                                color="primary"
                              />);
                            }
                          })()}
                        </TableCell>
                        <TableCell style={{ color: `#${generateStringColor(row.name)}` }}><b>{row.name}</b></TableCell>
                        <TableCell>
                          <Chip
                            style={{ height: '21px' }}
                            label={row.points}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>{row.viewtime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </TabContainer>}
      </RequireAuth>
    );
  }
}

export default Public;
