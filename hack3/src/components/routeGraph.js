import React from 'react'
import Station from './station'

function RouteGraph({route_data,number}) {
  route_data = route_data.data;
  //console.log(route_data)
  const data = route_data[Object.keys(route_data)[number]]
  const len = data.length
  //console.log(data);
  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map((info,i)=>{return(<Station info={info} i={i} len={len}/>)})
      }
    </div>
  )
}

export default RouteGraph
