import { useState } from "react";

//* make years and days array
const generateArray = (start: number, end: number) => {
  let arr = [];
  for (start; start <= end; start++) {
    arr.push(start);
  }
  return arr;
};

const days = generateArray(1, 31);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years = generateArray(1900, new Date().getFullYear());

const calculateAge = (birthday: string) => {
  //$ milliseconds in a year 1000*24*60*60*365.24 = 31556736000;
  let today = new Date(),
    dob = new Date(birthday),
    //$ difference in milliseconds
    diff = today.getTime() - dob.getTime(),
    //$ convert milliseconds into years
    years = Math.floor(diff / 31556736000),
    //$ 1 day has 86400000 milliseconds
    days_diff = Math.floor((diff % 31556736000) / 86400000),
    //$ 1 month has 30.4167 days
    months = Math.floor(days_diff / 30.4167),
    days = Math.floor(days_diff % 30.4167);

  console.log(`${years} years ${months} months ${days} days`);
  return `${years} years ${months} months ${days} days`;
};

const App: React.FC = ({}) => {
  const [day, setDay] = useState(12);
  const [month, setMonth] = useState("Sep");
  const [year, setYear] = useState(2000);
  const [age, setAge] = useState("Click Calculate to see your age");

  const handleDayChange = (e: any) => setDay(e.target.value);
  const handleMonthChange = (e: any) => setMonth(e.target.value);
  const handleYearChange = (e: any) => setYear(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let age = calculateAge(`${month} ${day} ${year}`);
    setAge(age);
  };

  return (
    <>
      <h1>Age Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <Input arr={days} handleChange={handleDayChange} val={day} />
          <Input arr={months} handleChange={handleMonthChange} val={month} />
          <Input arr={years} handleChange={handleYearChange} val={year} />
        </div>
        <button type='submit'>Calculate</button>
      </form>
      <div>
        <h2>Your age is</h2>
        <span>{age}</span>
      </div>
      <footer>
        Built by{" "}
        <a href='https://piyushpandey.tech'>Piyush(Purusottam Pandey)</a>
      </footer>
    </>
  );
};

const Input = (props: any) => {
  let options = props.arr.map((item: any) => (
    <option value={item} key={item}>
      {item}
    </option>
  ));

  return (
    <select onChange={props.handleChange} value={props.val}>
      {options}
    </select>
  );
};

export default App;
