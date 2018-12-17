import React from 'react'
import { AreaChart, YAxis, Grid,XAxis } from 'react-native-svg-charts'
import { View, } from 'react-native'
import {CONSTANTS,COLORS,styles} from '../../Constants';
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import {connect} from 'react-redux';
import * as shape from 'd3-shape';



class Chart extends React.PureComponent {
    getValue = (value,index) =>{
      //console.log(value,index)
      if(index==0)return null
      return `month ${index}`;
    }
    yaxisValue = (value) => {
      if(value%100==0)return value;
      else return ` `
    }

    render() {
      const { componentStyle } = this.props;
      const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset={"0%"} stopColor={COLORS.DIM_GREEN} />
          <Stop offset={"100%"} stopColor={COLORS.WHITE} />
        </LinearGradient>
      </Defs>
    );
      const data = [ 50, 300,350,360,395,450,500 ]
      const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
      return (
        <View style={{ height: 250, padding: 20, flexDirection: 'row' }}>
              <YAxis
                  data={data}
                  style={{ marginBottom: xAxisHeight }}
                  contentInset={verticalContentInset}
                  svg={axesSvg}
                  formatLabel={ value => this.yaxisValue(value) }
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                  <AreaChart
                      style={{ flex: 1,borderLeftWidth:1,borderBottomWidth:1,borderColor:COLORS.VERY_DIM_GREY }}
                      data={data}
                      contentInset={verticalContentInset}
                      curve={ shape.curveNatural }
                      svg={{ fill: 'url(#gradient)' }}
                  >
                    <Gradient />
                  </AreaChart>
                  <XAxis
                      style={{ marginHorizontal: -10, height: xAxisHeight,marginTop:5 }}
                      data={data}
                      formatLabel={(value, index) => this.getValue(value,index)}
                      contentInset={{ left: -20, right: 20, }}
                      svg={axesSvg}
                  />
              </View>
          </View>
      )
    }

}

export default connect(null,null)(Chart);
