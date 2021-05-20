import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid } from '@material-ui/data-grid';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 50px;
  padding: 1em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, rows, addCardMessage, addRegularMessage, addErrorMessage, addRows, clearRows } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('Name');
  const [queryString, setQueryString] = useState('');
  const [comp, setComp] = useState('=');

  const [operation, setOperation] = useState('');

  const [queryType2, setQueryType2] = useState('');
  const [queryString2, setQueryString2] = useState('');
  const [comp2, setComp2] = useState('=');

  const relations = ['=', '>', '>=', '<', '<=', '!='];
  const columns = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Subject', headerName: 'Subject', width: 200 },
    { field: 'Score', headerName: 'Score', width: 200 },
  ];

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    clearRows();
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.post('/api/query-db', {
      queryType,
      queryString,
      comp,
      operation,
      queryType2,
      queryString2,
      comp2
    }); // TODO: axios.xxx call the right api
    if (!messages) {
      addErrorMessage(message);
      clearRows();
    }
    else if (messages && messages.length > 0) {
      console.log(messages);
      addRegularMessage(message);
      addRows(...messages);
    }
    else {
      addRegularMessage(message);
      clearRows();
    }

  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl>
            <Select
              labelId="select-type-label"
              id="select-type"
              variant="outlined"
              value={queryType}
              onChange={handleChange(setQueryType)}
              style={{ height: 40, marginRight: 10, backgroundColor: "lightskyblue" }}
            >
              {['Name', 'Subject', 'Score'].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledFormControl>
        {
          queryType === 'Score' ? (
            <>
              <StyledFormControl>
                <FormControl>
                  <Select
                    labelId="select-rel-label"
                    id="select-rel"
                    value={comp}
                    onChange={handleChange(setComp)}
                  >
                    {relations.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledFormControl>
            </>) : <></>
        }
        <TextField
          placeholder={'Query ' + queryType + '...'}
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Row style={{ padding: 5 }}>
        <div style={{ marginRight: 5 }}>|____</div>
        <StyledFormControl>
          <FormControl>
            <Select
              labelId="select-and_or-label"
              id="select-and_or"
              variant="outlined"
              value={operation}
              onChange={handleChange(setOperation)}
              style={{ height: 40, marginRight: 10, backgroundColor: operation === '' ? "lightgray" : "lightpink" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {['AND', 'OR'].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledFormControl>

        <StyledFormControl>
          <FormControl>
            <Select
              labelId="select-type2-label"
              id="select-type2"
              variant="outlined"
              value={queryType2}
              onChange={handleChange(setQueryType2)}
              style={{ height: 40, marginRight: 10, backgroundColor: queryType2 === '' ? "" : "lightyellow" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {['Name', 'Subject', 'Score'].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledFormControl>
        {
          queryType2 === 'Score' ? (
            <>
              <StyledFormControl>
                <FormControl>
                  <Select
                    labelId="select-rel2-label"
                    id="select-rel2"
                    value={comp2}
                    onChange={handleChange(setComp2)}
                  >
                    {relations.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledFormControl>
            </>) : <></>
        }
        <TextField
          placeholder={'Query ' + queryType2 + '...'}
          value={queryType2 === '' ||  operation === '' ? '' : queryString2}
          onChange={handleChange(setQueryString2)}
          style={{ flex: 1, marginLeft: 10 }}
          disabled={queryType2 === '' ||  operation === ''}
        />
      </Row>
      <div style={{ color: "white", width: "100%", backgroundColor: "#87CEEB", marginTop: 5, marginBottom: 0, padding: 1, fontFamily: "monospace" }}>Message Box...</div>
      <ContentPaper variant="outlined" style={{ boxShadow: "inset 0 0 5px lightgray" }}>
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <div key="datagrid-wrapper" style={{ height: 310, width: '100%', overflow: "auto" }}>
        <DataGrid key="datagrid" rows={rows} columns={columns} pageSize={5} rowHeight={40} headerHeight={45} disableSelectionOnClick />
      </div>
    </Wrapper>
  );
};

export default Body;

/*<div style={{ height: 310, width: '100%', overflow: "auto" }}>
  <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={40} headerHeight={50} disableSelectionOnClick />
</div>*/
/*
<ContentPaper variant="outlined" style={{ height: 300, fontSize: 16, color: rows.length ? "gray" : "lightgray" }} >
        {rows.length ?
          rows.map((r, i) => (
            <Typography variant="body2" key={r + i} style={{ fontSize: 16 }}>
              {JSON.stringify(r)}
            </Typography>
          )) :
          'No results'}
      </ContentPaper>
*/
/*
<StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="Score"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
*/