import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {saveAs} from 'file-saver';
import SubmitDialog from './SubmitDialog';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  wordArray,
  getAllExcerptsMultiFieldObject,
  getAllExcerptsSingleFieldObject,
} from './FieldGenerator';
// FOR TEST ONLY!
import {
  testBasicInfoFields,
  testFamiliarityFields,
  testEmotionChangeTextFields,
  testOverallEmotionRatingFields,
  testEmotionChangeRatingFields,
} from './TestFields';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function EmotionChangeRadio(props) {
  const [error, setError] = React.useState(props.value === 0);

  const handleRadioChange = (event) => {
    props.setValue(props.name, event.target.value);
    setError(false);
  };

  return (
    <FormControl component="fieldset" error={error} variant="standard">
      <FormLabel color="success">{props.label}</FormLabel>
      <RadioGroup aria-label={props.name} name={props.name} row
                  value={props.value} onChange={handleRadioChange}>
        <FormControlLabel key="no_change" value="no_change" control={<Radio/>}
                          label="no change" labelPlacement="end"/>
        <FormControlLabel key="low_change" value="low_change" control={<Radio/>}
                          label="low change" labelPlacement="end"/>
        <FormControlLabel key="moderate_change" value="moderate_change"
                          control={<Radio/>}
                          label="moderate change" labelPlacement="end"/>
        <FormControlLabel key="high_change" value="high_change"
                          control={<Radio/>}
                          label="high change" labelPlacement="end"/>
      </RadioGroup>
      <FormHelperText>{error ? 'Please select an option.' : ''}</FormHelperText>
    </FormControl>
  );
}

function OverallEmotionRadio(props) {
  const [error, setError] = React.useState(props.value === 0);

  const handleRadioChange = (event) => {
    props.setValue(props.name, event.target.value);
    setError(false);
  };

  return (
    <FormControl component="fieldset" error={error} variant="standard">
      <FormLabel color="success">{props.label}</FormLabel>
      <Slider
        aria-label={props.name}
        name={props.name}
        valueLabelDisplay="off"
        marks={[
          {
            value: 1,
            label: props.axisLabel[0],
          }, {
            value: 5,
            label: props.axisLabel[1],
          }]}
        value={props.value}
        step={0.05}
        min={1}
        max={5}
        onChange={handleRadioChange}
        sx={{
          minWidth: '360px',
          '& .MuiSlider-track': {
            opacity: 0,
          },
        }}
      />
      {/* <RadioGroup aria-label={props.name} name={props.name} row value={props.value} onChange={handleRadioChange}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
          if (i === 1) {
            return (<FormControlLabel key={i} value={i} control={<Radio />} label={`${props.axisLabel[0]} ${i}`} labelPlacement="bottom" />);
          } else if (i === 5) {
            return (<FormControlLabel key={i} value={i} control={<Radio />} label={`${i} ${props.axisLabel[1]}`} labelPlacement="bottom" />);
          } else {
            return (<FormControlLabel key={i} value={i} control={<Radio />} label={i} labelPlacement="bottom" />);
          }
        })}
      </RadioGroup> */}
      <FormHelperText>{error ? 'Please select an option.' : ''}</FormHelperText>
    </FormControl>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Ad swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]];
  }
  return array;
}

const labelArray = [
  'Valence',
  'Tension arousal',
  'Energy arousal',
];

const axisLabelArray = [
  ['negative', 'positive'],
  ['relaxed', 'tensed'],
  ['tired', 'energetic']];

const getOneExcerptWordKeyArray = (wordArray, excerptID) => {
  return wordArray.map((word) => `Excerpt${excerptID}_${word}`);
};

function Group2Form(props) {
  const testMode = false;

  const initialBasicInfoFields = {
    Name: '',
    Age: '',
    Years: '',
    MusicIdentity: '',
    ListenHabit: '',
    Feedback: '',
  };
  const initialFamiliarityFields = getAllExcerptsSingleFieldObject(1, 10,
    'FamiliarityRatingExcerpt', [0]);
  const initialEmotionChangeTextFields = getAllExcerptsSingleFieldObject(1, 10,
    'EmotionChangeTextExcerpt', ['']);
  const initialOverallEmotionRatingFields = getAllExcerptsMultiFieldObject(1,
    10, [3]);
  const initialEmotionChangeRatingFields = getAllExcerptsMultiFieldObject(1, 10,
    ['']);

  const [basicInfoFields, setBasicInfoFields] = useState(
    testMode ? testBasicInfoFields : initialBasicInfoFields);
  const [familiarityFields, setFamiliarityFields] = useState(
    testMode ? testFamiliarityFields : initialFamiliarityFields);
  const [emotionChangeTextFields, setEmotionChangeTextFields] = useState(
    testMode ? testEmotionChangeTextFields : initialEmotionChangeTextFields);
  const [overallEmotionRatingFields, setOverallEmotionRatingFields] = useState(
    testMode
      ? testOverallEmotionRatingFields
      : initialOverallEmotionRatingFields);
  const [emotionChangeRatingFields, setEmotionChangeRatingFields] = useState(
    testMode
      ? testEmotionChangeRatingFields
      : initialEmotionChangeRatingFields);

  const [dialogStatus, setDialogStatus] = useState({
    open: false,
    status: 'incomplete',
  });

  const handleDialogClose = () => {
    setDialogStatus({
      open: false,
      status: dialogStatus.status,
    });
  };

  // record answer
  const changeBasicInfoFields = (event) => {
    const {name, value} = event.target;
    setBasicInfoFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeFamiliarityFields = (event) => {
    const {name, value} = event.target;
    setFamiliarityFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeEmotionChangeTextFields = (event) => {
    const {name, value} = event.target;
    setEmotionChangeTextFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeOverallEmotionRatingFields = (name, value) => {
    setOverallEmotionRatingFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeEmotionChangeRatingFields = (name, value) => {
    setEmotionChangeRatingFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveJson = () => {
    let jsonData = {};
    jsonData['Name'] = basicInfoFields.Name;
    jsonData['Age'] = basicInfoFields.Age;
    jsonData['Musical Training Years'] = basicInfoFields.Years;
    jsonData['Music Identity'] = basicInfoFields.MusicIdentity;
    jsonData['Listen Habit'] = basicInfoFields.ListenHabit;
    jsonData['Feedback'] = basicInfoFields.Feedback;

    // TODO: add for wordRatingFields
    // Object.assign(jsonData, wordRatingFields);

    props.section3.forEach((e, i) => {
      jsonData['FamiliarityRatingExcerpt' + e] =
        familiarityFields['FamiliarityRatingExcerpt' + (i + 1).toString()];
    });
    props.section3.forEach((e, i) => {
      jsonData['EmotionChangeTextExcerpt' + e] =
        emotionChangeTextFields['EmotionChangeTextExcerpt' +
        (i + 1).toString()];
    });

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        let fieldName = 'Excerpt' + (i + 1).toString() + '_' + wordArray[j];
        jsonData['OverallEmotionRating' + props.section3[i] + '_' +
        wordArray[j]] =
          overallEmotionRatingFields[fieldName];
        jsonData['EmotionChangeRating' + props.section3[i] + '_' +
        wordArray[j]] =
          emotionChangeRatingFields[fieldName];
      }
    }

    saveAs(
      new Blob([JSON.stringify(jsonData, null, 2)], {type: 'application/json'}),
      'form_result_' + Date.now().toString(),
    );
  };

  const onSubmit = () => {
    // if (Object.values(formFields).includes('') ||
    //     Object.values(wordRatingFields).includes(0)) {
    if (Object.values(basicInfoFields).includes('')) {
      setDialogStatus({
        open: true,
        status: 'incomplete',
      });
    } else {
      setDialogStatus({
        open: true,
        status: 'complete',
      });
      saveJson();
    }
  };

  //Section define
  const getSection3PieceComponent = (i) => {
    return (
      <div key={i.toString()}>
        <Stack direction="column" justifyContent="center" alignItems="center"
               spacing={2}>
          <audio controls>
            <source src={props.section3[i] + '.ogg'} type="audio/ogg"/>
            Your browser does not support the audio element.
          </audio>
          {/* display file name*/}
          {/*<Typography variant="body1">{props.section3[i] + '.ogg'}</Typography>*/}
        </Stack>
      </div>
    );
  };

  const getExcerptComponent = (i) => {
    return (
      <Stack direction="column" justifyContent="center" spacing={3}>
        <Divider>Excerpt {i}</Divider>
        {getSection3PieceComponent(i - 1)}
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <b>
              What are the overall emotions do you perceive in this excerpt?
            </b>
          </FormLabel>
          <Stack direction="column" alignItems="center" spacing={1}>
            {getOneExcerptWordKeyArray(wordArray, i).map((item, index) => (
              <OverallEmotionRadio
                key={`${item}_${index.toString()}`}
                name={item}
                value={overallEmotionRatingFields[item]}
                setValue={changeOverallEmotionRatingFields}
                label={labelArray[index]}
                axisLabel={axisLabelArray[index]}
              />
            ))}
          </Stack>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <b>
              How much change in emotion do you perceive in this excerpt?
            </b>
          </FormLabel>
          <Stack direction="column" alignItems="center" spacing={1}>
            {getOneExcerptWordKeyArray(wordArray, i).map((item, index) => (
              <EmotionChangeRadio
                key={`${item}_${index.toString()}`}
                name={item}
                value={emotionChangeRatingFields[item]}
                setValue={changeEmotionChangeRatingFields}
                label={wordArray[index]}
              />
            ))}
          </Stack>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <b>
              What changes in music make you perceive this change in emotion?
            </b>
          </FormLabel>
          <TextField
            multiline
            maxRows={3}
            fullWidth
            required
            name={`EmotionChangeTextExcerpt${i.toString()}`}
            value={emotionChangeTextFields[`EmotionChangeTextExcerpt${i.toString()}`]}
            helperText="Cannot be empty."
            onChange={changeEmotionChangeTextFields}
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend"><b>How familiar are you with this
            excerpt?</b></FormLabel>
          <Typography component="span">(1 is not familiar at all, 5 is very
            familiar)</Typography>
          <RadioGroup
            row
            name={`FamiliarityRatingExcerpt${i.toString()}`}
            value={familiarityFields[`FamiliarityRatingExcerpt${i.toString()}`]}
            onChange={changeFamiliarityFields}
          >
            <FormControlLabel value={1} control={<Radio/>} label="1"/>
            <FormControlLabel value={2} control={<Radio/>} label="2"/>
            <FormControlLabel value={3} control={<Radio/>} label="3"/>
            <FormControlLabel value={4} control={<Radio/>} label="4"/>
            <FormControlLabel value={5} control={<Radio/>} label="5"/>
          </RadioGroup>
        </FormControl>
      </Stack>
    );
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 'min-content',
          maxWidth: 'min-content',
          marginRight: '24px',
        }}
      >
        <Tab label="Instruction" {...a11yProps(0)} />
        <Tab label="Participant Information" {...a11yProps(1)} />
        <Tab label="Excerpt1" {...a11yProps(2)} />
        <Tab label="Excerpt2" {...a11yProps(3)} />
        <Tab label="Excerpt3" {...a11yProps(4)} />
        <Tab label="Excerpt4" {...a11yProps(5)} />
        <Tab label="Excerpt5" {...a11yProps(6)} />
        <Tab label="Excerpt6" {...a11yProps(7)} />
        <Tab label="Excerpt7" {...a11yProps(8)} />
        <Tab label="Excerpt8" {...a11yProps(9)} />
        <Tab label="Excerpt9" {...a11yProps(10)} />
        <Tab label="Excerpt10" {...a11yProps(11)} />
        <Tab label="Finish the Experiment" {...a11yProps(12)} />
      </Tabs>

      <Stack direction="column" justifyContent="center" alignItems="stretch"
             spacing={8} sx={{display: 'contents'}}>
        <TabPanel value={value} index={0}>
          <Stack direction="column" justifyContent="flex-start"
                 alignItems="center" spacing={4}>
            <Typography variant="h3" component="div"
                        style={{alignSelf: 'center'}}>
              MUMT-617 Experiment: Music Affect
            </Typography>
            <Typography variant="h5" component="div">
              Please read the following instruction carefully
            </Typography>
            <Typography variant="body1" component="div">
              Please conduct this survey at a computer with your best pair of
              headphones. The experiment should take 20 minutes.
            </Typography>
            <Typography variant="body1" component="div">
              <b>
                Once you have submitted the form, a text file of your answers
                should download automatically; please send
                the file to whoever referred you to the experiment.
              </b>
            </Typography>
            <Typography variant="body1" component="div">
              After providing some personal background information, you will be
              asked to listen to fifteen short
              excerpts for string quartet, and rate to what degree a list of
              descriptors apply to the timbre of the
              excerpt in question; insofar as it is possible, try to limit your
              application of these descriptors to just
              the use of timbre, and not other parameters (e.g. harmony, melody,
              rhythm, etc.).{' '}
            </Typography>
            <Typography variant="body1" component="div">
              The Oxford English Dictionary defines timbre as "the character or
              quality of a musical sound or voice as
              distinct from its pitch and intensity." For example, timbre would
              be the quality of a sound that aids in
              distinguishing the sound of a clarinet from the sound of a
              trombone. Examples of timbral descriptors would
              include calling the flute clear, the trumpet brassy, or the
              bassoon woody.
            </Typography>
          </Stack>
        </TabPanel>

        <Stack direction="column" justifyContent="flex-start"
               alignItems="center" spacing={3}>
          {/* writing questions*/}
          <TabPanel value={value} index={1}>
            <Stack direction="column" justifyContent="flex-start"
                   alignItems="stretch" spacing={8}>
              <Typography variant="h4" component="div"
                          style={{alignSelf: 'center'}}>
                Participant information
              </Typography>
              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">What is your full name?</Typography>
                <TextField
                  label="Frist name last name"
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="Name"
                  value={basicInfoFields['Name']}
                  helperText="Cannot be empty."
                  onChange={changeBasicInfoFields}
                />
              </Stack>

              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">What is your age?</Typography>
                <TextField
                  label="Type number"
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="Age"
                  value={basicInfoFields['Age']}
                  helperText="Cannot be empty."
                  onChange={changeBasicInfoFields}
                />
              </Stack>

              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">How many years of musical training
                  have you
                  had?</Typography>
                <TextField
                  label="Type number"
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="Years"
                  value={basicInfoFields['Years']}
                  helperText="Cannot be empty."
                  onChange={changeBasicInfoFields}
                />
              </Stack>

              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">
                  If you are a musician, what is your primary occupation(s) as a
                  musician (composer, conductor,
                  musicologist, performer, theorist, etc.)? If you are a
                  performer, include your primary instrument(s)
                  or voice type.
                </Typography>
                <TextField
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="MusicIdentity"
                  value={basicInfoFields['MusicIdentity']}
                  helperText="Cannot be empty."
                  onChange={changeBasicInfoFields}
                />
              </Stack>

              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">
                  How would you describe your musical listening habits? What
                  type(s) of music do you listen to regularly
                  and are most familiar with?
                </Typography>
                <TextField
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="ListenHabit"
                  value={basicInfoFields['ListenHabit']}
                  helperText="Cannot be empty."
                  onChange={changeBasicInfoFields}
                />
              </Stack>
            </Stack>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="h4" component="div"
                        style={{alignSelf: 'center', marginBottom: '1em'}}>
              Listen to 10 Excerpts of music and rate
            </Typography>
            {/*Excerpt1*/}
            {getExcerptComponent(1)}
          </TabPanel>

          {/*Excerpt2*/}
          <TabPanel value={value} index={3}>
            {getExcerptComponent(2)}
          </TabPanel>

          {/*Excerpt3*/}
          <TabPanel value={value} index={4}>
            {getExcerptComponent(3)}
          </TabPanel>

          {/*Excerpt4*/}
          <TabPanel value={value} index={5}>
            {getExcerptComponent(4)}
          </TabPanel>

          {/*Excerpt5*/}
          <TabPanel value={value} index={6}>
            {getExcerptComponent(5)}
          </TabPanel>

          {/*Excerpt6*/}
          <TabPanel value={value} index={7}>
            {getExcerptComponent(6)}
          </TabPanel>

          {/*Excerpt7*/}
          <TabPanel value={value} index={8}>
            {getExcerptComponent(7)}
          </TabPanel>

          {/*Excerpt8*/}
          <TabPanel value={value} index={9}>
            {getExcerptComponent(8)}
          </TabPanel>

          {/*Excerpt9*/}
          <TabPanel value={value} index={10}>
            {getExcerptComponent(9)}
          </TabPanel>

          {/*Excerpt10*/}
          <TabPanel value={value} index={11}>
            {getExcerptComponent(10)}
          </TabPanel>

          {/* Submit the questionnaire */}
          <TabPanel value={value} index={12}>
            <Stack direction="column" justifyContent="center" spacing={3}>
              <Typography variant="h4" component="div"
                          style={{alignSelf: 'center'}}>
                Thanks for Participating!!!
              </Typography>

              <Stack direction="column" justifyContent="center"
                     alignItems="center" spacing={2}>
                <Typography component="div">If you have any comments, questions
                  or concerns, feel free to share them below!</Typography>
                <TextField
                  multiline
                  maxRows={3}
                  fullWidth
                  required
                  name="Feedback"
                  value={basicInfoFields['Feedback']}
                  onChange={changeBasicInfoFields}
                />
              </Stack>

              <Typography fontWeight="bold" component="div">
                Once you have submitted the form, a text file(.json) of your
                answers should download automatically;
                please send the file to whoever referred you to the experiment.
              </Typography>
              <Divider>Experiment Finished</Divider>

              <Button variant="contained" endIcon={<SendIcon/>} size="large"
                      color="secondary" onClick={onSubmit}>
                Submit
              </Button>
              <SubmitDialog open={dialogStatus.open}
                            status={dialogStatus.status}
                            onClose={handleDialogClose}/>
            </Stack>
          </TabPanel>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function Group2FormPage() {

  const section3AudioArray = [
    'Excerpt1',
    'Excerpt2',
    'Excerpt3',
    'Excerpt4',
    'Excerpt5',
    'Excerpt6',
    'Excerpt7',
    'Excerpt8',
    'Excerpt9',
    'Excerpt10',
  ];

  /*
  let shuffledSection1AudioArray = shuffle(section1AudioArray);
  let shuffledSection2AudioArray = shuffle(section2AudioArray);
  */
  let shuffledSection3AudioArray = shuffle(section3AudioArray);

  return (
    <Container maxWidth="lg" style={{marginTop: '36px', marginBottom: '36px'}}>
      <Group2Form
        //section1={shuffledSection1AudioArray}
        //section2={shuffledSection2AudioArray}
        section3={shuffledSection3AudioArray}
      />
    </Container>
  );
}
