import "./App.css";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
import { useEffect, useState } from "react";

const endPontURL = "http://localhost:9000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: endPontURL }),
  cache: new InMemoryCache(),
});

const getStudents = async () => {
  const query = gql`
    {
      students {
        id
        firstName
        lastName
        fullName
      }
    }
  `;
  const { data } = await client.query({ query });
  return data.students;
};

const App = () => {
  const [students, setStudents] = useState();

  const getStudentsData = async () => {
    const studentsData = await getStudents();
    setStudents(studentsData);
    // console.log("studentsData", studentsData);
    return;
  };

  const loadStudents = () => getStudentsData();

  useEffect(() => {
    console.log("in use effect");
  }, [students]);

  return (
    <div>
      <br />
      <button onClick={loadStudents}>Load Students</button>
      <hr />
      <table border="1">
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Full Name</td>
          </tr>
        </thead>
        <tbody>
          {console.log("students", students)}
          {students?.map((student) => {
            return (
              <tr>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.fullName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
