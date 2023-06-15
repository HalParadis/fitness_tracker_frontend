import React, { useState, useEffect } from "react";
import { fetchFromAPI } from '../api'

const Activities = ({
  token,
  user
}) => {

  const [activities, setActivities] = useState([]);
  const fetchActivities = async () => {
    const data = await fetchFromAPI({
      endpoint: "activities",
    });

    console.log("data: ", data);

    if (data) {
      setActivities(data);
    }
  }

  useEffect(() => {
    fetchActivities();
    console.log("activities: ", activities)

  }, [])


  return (
    <>
      <h2><u>Activities</u></h2>
      
      <div className="displayActivities">
        {activities.map((activity, idx) => (
          <div key={activity.id ?? idx}>
            <h3>Name: {activity.name}</h3>
            <p>Description: {activity.description}</p>
            <br></br>
            <hr></hr>
          </div>
        ))
        }
      </div>
    </>
  )
}

export default Activities;