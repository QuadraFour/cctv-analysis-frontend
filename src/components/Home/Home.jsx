/* eslint-disable react/prop-types */
import "./Home.css";

function Home({ data }) {
  const incident = data;
  const rows = incident.map((el) => (
    <tr key={el._id}>
      <td>{el._id}</td>
      <td style={{textTransform:"uppercase"}}>{el.type}</td>
      <td style={{textTransform:"uppercase"}}>{el.levelOfAlert}</td>
      <td>{el.locality}</td>
      <td>{el.time}</td>
    </tr>
  ));

  return (
    <div>
      <center>
        <h1 style={{ marginTop: "100px" }}>Incident Data</h1>
      </center>
      <table>
        <thead>
          <tr>
            <th>Incident ID</th>
            <th>Incident Type</th>
            <th>Level of alert</th>
            <th>Incident Locality</th>
            <th>Incident Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Home;
