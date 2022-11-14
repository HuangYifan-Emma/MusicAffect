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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Ad swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function Group2Form(props) {
  const [formFields, setFormFields] = useState({
    /*
    'section1_piece1': '',
    'section1_piece2': '',
    'section1_piece3': '',
    'section1_piece4': '',
    'section2_piece1': '',
    'section2_piece2': '',
    'section2_piece3': '',
    */
    'Excerpt1': '',
    'Excerpt2': '',
    'Excerpt3': '',
    'Excerpt4': '',
    'Excerpt5': '',
    'Excerpt6': '',
    'Excerpt7': '',
    'Excerpt8': '',
    'Excerpt9': '',
    'Excerpt10': '',
    'Excerpt11': '',
    'Excerpt12': '',
    'Excerpt13': '',
    'Excerpt14': '',
    'Excerpt15': '',
    'FamiliarityRatingExcerpt1': 0,
    'FamiliarityRatingExcerpt2': 0,
    'FamiliarityRatingExcerpt3': 0,
    'FamiliarityRatingExcerpt4': 0,
    'FamiliarityRatingExcerpt5': 0,
    'FamiliarityRatingExcerpt6': 0,
    'FamiliarityRatingExcerpt7': 0,
    'FamiliarityRatingExcerpt8': 0,
    'FamiliarityRatingExcerpt9': 0,
    'FamiliarityRatingExcerpt10': 0,
    'FamiliarityRatingExcerpt11': 0,
    'FamiliarityRatingExcerpt12': 0,
    'FamiliarityRatingExcerpt13': 0,
    'FamiliarityRatingExcerpt14': 0,
    'FamiliarityRatingExcerpt15': 0,
    'Name': '',
    'Age': 0,
    'Years': 0,
    'MusicIdentity': '',
    'ListenHabit': '',
    'StringQuartetFamiliarity': 0,
    'ViolinFamiliarity': 0,
    'ViolaFamiliarity': 0,
    'CelloFamiliarity': 0,
    'ContemporaryFamiliarity': 0,
    'ExtendedTechFamiliarity': 0,
    'LachenmannFamiliarity': 0,
    'Feedback': ''
  });
  const [dialogStatus, setDialogStatus] = useState({
    'open': false,
    'status': 'incomplete',
  })

  const handleDialogClose = () => {
    setDialogStatus({
      'open': false,
      'status': dialogStatus.status
    });
  }

// record answer
  const changeFormFields = (event) => {
    const {name, value} = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveJson = () => {
    let jsonData = {};
   /* props.section1.forEach((e, i) => {
      jsonData[e] = formFields['section1_piece' + ((i + 1).toString())];
    })
    props.section2.forEach((e, i) => {
      jsonData[e] = formFields['section2_piece' + ((i + 1).toString())];
    })
    */
   jsonData['Name'] = formFields.Name;
   jsonData['Age'] = formFields.Age;
   jsonData['Musical Training Years'] = formFields.Years;
   jsonData['Music Identity'] = formFields.MusicIdentity;
   jsonData['Listen Habit'] = formFields.ListenHabit;
   jsonData['StringQuartetFamiliarity'] = formFields.StringQuartetFamiliarity;
   jsonData['ViolinFamiliarity'] = formFields.ViolinFamiliarity;
   jsonData['ViolaFamiliarity'] = formFields.ViolaFamiliarity;
   jsonData['CelloFamiliarity'] = formFields.CelloFamiliarity;
   jsonData['ContemporaryFamiliarity'] = formFields.ContemporaryFamiliarity;
   jsonData['ExtendedTechFamiliarity'] = formFields.ExtendedTechFamiliarity;
   jsonData['LachenmannFamiliarity'] = formFields.LachenmannFamiliarity;
   jsonData['Feedback'] = formFields.Feedback;


    props.section3.forEach((e, i) => {
      jsonData[e] = formFields['Excerpt' + ((i+1).toString())];
    })
    props.section3.forEach((e, i) => {
      jsonData['FamiliarityRatingExcerpt'+ e] = formFields['FamiliarityRatingExcerpt'+ ((i+1).toString())];
    })

    jsonData['question1'] = formFields.question1;
    
    
   
    saveAs(new Blob([JSON.stringify(jsonData, null, 2)],
      {type: 'application/json'}), 'form_result_' + Date.now().toString());
  };

  const onSubmit = () => {
    if (Object.values(formFields).includes('')) {
      setDialogStatus({
        'open': true,
        'status': 'incomplete'
      });
    } else {
      setDialogStatus({
        'open': true,
        'status': 'complete'
      });
      saveJson();
    }
  }

//old  first two section
/*
  const getSection1PieceComponent = (i, formValue) => {
    return <div key={i.toString()}>
      <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
        <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="center"
               spacing={2}>
          <audio controls>
            <source src={props.section1[i] + '_1.ogg'} type="audio/ogg"/>
            Your browser does not support the audio element.
          </audio>
          <audio controls>
            <source src={props.section1[i] + '_2.ogg'} type="audio/ogg"/>
            Your browser does not support the audio element.
          </audio>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Typography variant="body1">{props.section1[i] + '_1'}</Typography>
          <Typography variant="body1">{props.section1[i] + '_2'}</Typography>
        </Stack>
        <TextField
          label="Your description"
          multiline
          maxRows={3}
          fullWidth
          error={!formValue}
          required
          helperText="Cannot be empty."
          name={'section1_piece' + ((i + 1).toString())}
          value={formValue}
          onChange={changeFormFields}
        />
      </Stack>
    </div>;
  };

  const getSection2PieceComponent = (i, formValue) => {
    return <div key={i.toString()}>
      <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
        <audio controls>
          <source src={props.section2[i] + '.ogg'} type="audio/ogg"/>
          Your browser does not support the audio element.
        </audio>
        <Typography variant="body1">{props.section2[i]}</Typography>
        <TextField
          label="Your description"
          multiline
          maxRows={3}
          fullWidth
          error={!formValue}
          required
          helperText="Cannot be empty."
          name={'section2_piece' + ((i + 1).toString())}
          value={formValue}
          onChange={changeFormFields}
        />
      </Stack>
    </div>;
  };
  */

//Section define
  const getSection3PieceComponent = (i, formValue) => {
    return <div key={i.toString()}>
      <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
        <audio controls>
          <source src={props.section3[i] + '.mp3'} type="audio/mp3"/>
          Your browser does not support the audio element.
        </audio>
        {/* display file name*/}
        {/*<Typography variant="body1">{props.section3[i]}</Typography>*/}
        <TextField
          label="Your description"
          multiline
          maxRows={3}
          fullWidth
          error={!formValue}
          required
          helperText="Cannot be empty."
          name={'Excerpt' + ((i + 1).toString())}
          value={formValue}
          onChange={changeFormFields}
        />
      </Stack>
    </div>;
  };

  return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={8}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}>
          <Typography variant="h3" component="div"
                      style={{alignSelf: 'center'}}>
            MUMT616 Experiment
          </Typography>
          <Typography variant="body1" component="div" >
          After providing some personal background information, you will be asked to describe the timbre of fifteen excerpts for string quartet. These excerpts range from two seconds to one minute. Please use your best pair of headphones when listening to these examples. The experiment should take between 10 and 15 minutes.
          </Typography>
          <Typography variant="body1" component="div" >
          The Oxford English Dictionary defines timbre as "the character or quality of a musical sound or voice as distinct from its pitch and intensity." For example, timbre would be the quality of a sound that aids in distinguishing the sound of a clarinet from the sound of a trombone. Examples of timbral descriptors would include calling the flute clear, the trumpet brassy, or the bassoon woody.
          </Typography>
          {/*
          <Typography variant="subtitle1" component="div">
            Estimated time: x minutes
          </Typography>
          */}
        </Stack>
        <Divider/>
        
        {/*
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}>
          <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Section 1
          </Typography>
          <Typography variant="subtitle1" component="div">
            Listen to 4 pairs of string quartet, then write down
            how would you describe the sound/timbre you heard?
          </Typography>
             { {getSection1PieceComponent(0, formFields.section1_piece1)}
             {getSection1PieceComponent(1, formFields.section1_piece2)}
             {getSection1PieceComponent(2, formFields.section1_piece3)}
             {getSection1PieceComponent(3, formFields.section1_piece4)} }
        </Stack>
        <Divider>Section 1 Finished</Divider>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}>
          <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Section 2
          </Typography>
          <Typography variant="subtitle1" component="div">
            Listen to 3 Excerpts of string quartet with
            extended techniques and describe each
          </Typography>
          { {getSection2PieceComponent(0, formFields.section2_piece1)}
          {getSection2PieceComponent(1, formFields.section2_piece2)}
          {getSection2PieceComponent(2, formFields.section2_piece3)} }
        </Stack>
        <Divider>Section 2 Finished</Divider>
        */}

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}>
          

{/* writing quesitons*/}
        <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={8}>
        <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Participant information
          </Typography>
        <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             What is your full name? 
             </Typography>
          <TextField
          label="Frist name last name"
          multiline
          maxRows={3}
          fullWidth
          required
          name="Name"
          helperText="Cannot be empty."
          onChange={changeFormFields}
          />
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             What is your age? 
             </Typography>
          <TextField
          label="Type number"
          multiline
          maxRows={3}
          fullWidth
          required
          name="Age"
          helperText="Cannot be empty."
          onChange={changeFormFields}
          />
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             How many years of musical training have you had? 
             </Typography>
          <TextField
          label="Type number"
          multiline
          maxRows={3}
          fullWidth
          required
          name="Years"
          helperText="Cannot be empty."
          onChange={changeFormFields}
          />
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             If you are a musician, what is your primary occupation(s) as a musician (composer, conductor, musicologist, performer, theorist, etc.)? If you are a performer, include your primary instrument(s) or voice type. 
             </Typography>
          <TextField
          multiline
          maxRows={3}
          fullWidth
          required
          name="MusicIdentity"
          helperText="Cannot be empty."
          onChange={changeFormFields}
          />
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             How would you describe your musical listening habits? What type(s) of music do you listen to regularly and are most familiar with? 
             </Typography>
          <TextField
          multiline
          maxRows={3}
          fullWidth
          required
          name="ListenHabit"
          helperText="Cannot be empty."
          onChange={changeFormFields}
          />
        </Stack>
        </Stack>
        <Divider/>

        

{/* Familiarity with the string quartet */}
        <Stack direction="column" justifyContent="center" 
             spacing={2}>
          <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Familiarity with the string quartet and its instruments
          </Typography>
          <Typography>
             (1 is not familiar at all, 5 is very familiar)
          </Typography>
      
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with the sound of the string quartet?
            </FormLabel>
            <RadioGroup 
              row 
              name="StringQuartetFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" /> 
              </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with the sound of the violin?
            </FormLabel>
            <RadioGroup 
              row 
              name="ViolinFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with the sound of the viola?
            </FormLabel>
            <RadioGroup 
              row 
              name="ViolaFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

          
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with the sound of the cello?
            </FormLabel>
            <RadioGroup 
              row 
              name="CelloFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

          
        </Stack>
        <Divider/>
        

        <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Listen to 15 Excerpts of standard music and describe the timbre of each
            </Typography>

            
{/*Excerpt1*/}
          <Stack direction="column" justifyContent="center" 
             spacing={2}>
          <Divider>Excerpt 1</Divider>
          {getSection3PieceComponent(0, formFields.Excerpt1)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 1?
          </FormLabel>
          <Typography>
             (1 is not familiar at all, 5 is very familiar)
          </Typography>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt1"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt2*/}
          <Stack>
          <Divider>Excerpt 2</Divider>
          {getSection3PieceComponent(1, formFields.Excerpt2)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 2?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt2"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt3*/}
          <Stack>
          <Divider>Excerpt 3</Divider>
          {getSection3PieceComponent(2, formFields.Excerpt3)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 3?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt3"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt4*/}
          <Stack>
          <Divider>Excerpt 4</Divider>
          {getSection3PieceComponent(3, formFields.Excerpt4)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 4?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt4"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt5*/}
          <Stack>
          <Divider>Excerpt 5</Divider>
          {getSection3PieceComponent(4, formFields.Excerpt5)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 5?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt5"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt6*/}
          <Stack>
          <Divider>Excerpt 6</Divider>
          {getSection3PieceComponent(5, formFields.Excerpt6)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 6?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt6"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt7*/}
          <Stack>
          <Divider>Excerpt 7</Divider>
          {getSection3PieceComponent(6, formFields.Excerpt7)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 7?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt7"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt8*/}
          <Stack>
          <Divider>Excerpt 8</Divider>
          {getSection3PieceComponent(7, formFields.Excerpt8)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 8?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt8"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt9*/}
          <Stack>
          <Divider>Excerpt 9</Divider>
          {getSection3PieceComponent(8, formFields.Excerpt9)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 9?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt9"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack> 

{/*Excerpt10*/}
          <Stack>
          <Divider>Excerpt 10</Divider>
          {getSection3PieceComponent(9, formFields.Excerpt10)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 10?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt10"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt11*/}
          <Stack>
          <Divider>Excerpt 11</Divider>
          {getSection3PieceComponent(10, formFields.Excerpt11)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 11?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt11"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt12*/}
          <Stack>
          <Divider>Excerpt 12</Divider>
          {getSection3PieceComponent(11, formFields.Excerpt12)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 12?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt12"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt13*/}
          <Stack>
          <Divider>Excerpt 13</Divider>
          {getSection3PieceComponent(12, formFields.Excerpt13)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 13?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt13"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt14*/}
          <Stack>
          <Divider>Excerpt 14</Divider>
          {getSection3PieceComponent(13, formFields.Excerpt14)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 14?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt14"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>

{/*Excerpt15*/}
          <Stack>
          <Divider>Excerpt 15</Divider>
          {getSection3PieceComponent(14, formFields.Excerpt15)}
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with Excerpt 15?
          </FormLabel>
            <RadioGroup 
              row  
              name="FamiliarityRatingExcerpt15"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />    
            </RadioGroup>
          </FormControl>
          </Stack>
          <Divider/>

       {/*}   
          <FormControl component="fieldset">
            <FormLabel component="legend">
            Question
            </FormLabel>
            <RadioGroup 
              row 
              aria-label="Question" 
              name="question1"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              
              
              </RadioGroup>
            </FormControl>
      */}

        {/* Familiarity with the string quartet */}
        <Stack direction="column" justifyContent="center" 
             spacing={2}>
          <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Post-Experiment Questionnaire
          </Typography>
      
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with contemporary classical music?
            </FormLabel>
            <RadioGroup 
              row 
              name="ContemporaryFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" /> 
              </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with extended instrumental techniques?
            </FormLabel>
            <RadioGroup 
              row 
              name="ExtendedTechFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

          
          <FormControl component="fieldset">
            <FormLabel component="legend">
            How familiar are you with the music of Helmut Lachenmann?
            </FormLabel>
            <RadioGroup 
              row 
              name="LachenmannFamiliarity"
              onChange={changeFormFields}>
              <FormControlLabel value={1} control={<Radio />} label="1" />
              <FormControlLabel value={2} control={<Radio />} label="2" />
              <FormControlLabel value={3} control={<Radio />} label="3" />
              <FormControlLabel value={4} control={<Radio />} label="4" />
              <FormControlLabel value={5} control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

   
        </Stack>

        <Stack direction="column" justifyContent="center" 
             spacing={2}>
        <Typography variant="h4" component="div"
                      style={{alignSelf: 'center'}}>
            Thanks for Participating!!!
          </Typography>

          <Stack direction="column" justifyContent="center" alignItems="center"
             spacing={2}>
             <Typography>
             If you have any comments, questions or concerns, feel free to share them below!
             </Typography>
          <TextField
          multiline
          maxRows={3}
          fullWidth
          required
          name="Feedback"
          onChange={changeFormFields}
          />
          <Typography>
             When you click submit, a jason file of your experiment answer will be downloaded automatically. Please send to us! Thank you!
          </Typography>
        </Stack>

        </Stack>
          
        </Stack>
        <Divider>Experiment Finished</Divider>
        <Button variant="contained" endIcon={<SendIcon/>} size="large" color="secondary"
                onClick={onSubmit}>
          Submit
        </Button>
        <SubmitDialog open={dialogStatus.open} status={dialogStatus.status} onClose={handleDialogClose}/>
      </Stack>
  );
}

export default function Group2FormPage() {
  // const section1AudioArray = [
  //   'section1_pair1',
  //   'section1_pair2',
  //   'section1_pair3',
  //   'section1_pair4'];
  // const section2AudioArray = [
  //   'section2_piece1',
  //   'section2_piece2',
  //   'section2_piece3'];
   
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
    'Excerpt11',
    'Excerpt12',
    'Excerpt13',
    'Excerpt14',
    'Excerpt15'];

  /*
  let shuffledSection1AudioArray = shuffle(section1AudioArray);
  let shuffledSection2AudioArray = shuffle(section2AudioArray);
  */
  let shuffledSection3AudioArray = shuffle(section3AudioArray);

  return (
    <Container maxWidth="md" style={{marginTop: '36px', marginBottom: '36px'}}>
      <Group2Form
      //section1={shuffledSection1AudioArray}
      //section2={shuffledSection2AudioArray}
        section3={shuffledSection3AudioArray}/>
    </Container>
  );
}