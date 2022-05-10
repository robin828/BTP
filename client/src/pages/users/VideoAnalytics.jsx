import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Watch time(in sec) vs Students",
    },
  },
};
export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doubt Ask vs Video Time(in sec)",
    },
  },
};

const VideoAnalytics = () => {
  const id = useParams().id;
  const param = id ? id : "";
  //   const labels = ['S1'];

  const url = "http://localhost:5000";
  const [video, setVideo] = useState();
  const [watchTime, setWatchTime] = useState([]);
  const [labels, setLabels] = useState([]);
  const [time, setTime] = useState([]);
  const [timeData, setTimeData] = useState([]);

  React.useEffect(() => {
    let arr = [];
    let label = [];
    let timeLabel = [];

    Axios.post(`${url}/api/video/analytics`, {
      videoId: param,
      userId: localStorage.getItem("userId"),
      profId: "620e7f3e9135ef9f29cf75a3",
    }).then((res) => {
      res.data.analysis.forEach((an) => arr.push(parseInt(an.time)));
      res.data.analysis.forEach((an, ind) => label.push("s" + (ind + 1)));
      console.log(arr);
      console.log(res.data);
    });
    Axios.get(`${url}/api/video/?id=${param}`).then((res) => {
      console.log(res.data);
      setTime(res.data.video.videoLength);
    });
    setWatchTime(arr);
    setLabels(label);

    Axios.get(`${url}/api/video/messages/?id=${param}`).then((res) => {
      console.log(res.data);
      let timeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const mainTimeScale = Math.floor(parseInt((time * 10) / 100));
      console.log(mainTimeScale);
      res.data.doubtTime.forEach((ti) => {
          console.log(ti)
        let value = Math.floor(parseInt(ti));
        console.log(value)
        if (value < mainTimeScale) timeArr[0]++;
        if (value > mainTimeScale && value < 2 * mainTimeScale) timeArr[1]++;
        if (value > 2 * mainTimeScale && value < 3 * mainTimeScale)
          timeArr[2]++;
        if (value >= 3 * mainTimeScale && value < 4 * mainTimeScale)
          timeArr[3]++;
        if (value >= 4 * mainTimeScale && value < 5 * mainTimeScale)
          timeArr[4]++;
        if (value >= 5 * mainTimeScale && value < 6 * mainTimeScale)
          timeArr[5]++;
        if (value >= 6 * mainTimeScale && value < 7 * mainTimeScale)
          timeArr[6]++;
        if (value >= 7 * mainTimeScale && value < 8 * mainTimeScale)
          timeArr[7]++;
        if (value >= 8 * mainTimeScale && value < 9 * mainTimeScale)
          timeArr[8]++;
        if (value >= 9 * mainTimeScale && value < 10 * mainTimeScale)
          timeArr[9]++;
        // if(value>7*mainTimeScale && value<8*mainTimeScale) timeArr[7]++;
      });
      setTimeData(timeArr);
      console.log(timeArr);
    });
  }, []);
  let value = (time * 10) / 100;
  let timeLabel = [
    Math.floor(value),
    Math.floor(value) * 2,
    Math.floor(value) * 3,
    Math.floor(value) * 4,
    Math.floor(value) * 5,
    Math.floor(value) * 6,
    Math.floor(value) * 7,
    Math.floor(value) * 8,
    Math.floor(value) * 9,
    Math.floor(value) * 10,
  ];

  console.log(timeLabel);

  const data = {
    labels,
    datasets: [
      {
        label: "Watch Time",
        data: watchTime,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data1 = {
    labels: timeLabel,
    datasets: [
      {
        label: "No. of doubts ask by student",
        data: timeData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // console.log(video)

  // labels = []

  return (
    <div>
      <div style={{ textAlign: "center", margin: "10px", fontSize: 20 }}>
        Video Analysis
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={8}>
          <Line zIndex={200} options={options} data={data} />
        </Grid>
        {/* <Grid xs = {4} style={{ height: '280px'}}>
         dsbdfdjfjsdjdks
    </Grid> */}
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={8}>
          <Line options={options1} data={data1} />
        </Grid>
        {/* <Grid xs = {4}>
         dsbdfdjfjsdjdks
    </Grid> */}
      </Grid>
    </div>
  );
};

export default VideoAnalytics;
