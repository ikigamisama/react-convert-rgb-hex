import React, { Component } from 'react';
import './Color.css';

class Color extends Component {
  constructor(){
    super();
    this.state ={
      bg_color:"#009688",
      hex_color:"",
      rgb_color:"",
      hex_color_error:"",
      rgb_color_error:""
    }
  }
  onChangeColor = (evt) => {
    let target = evt.target,
        value = target.value,
        name = target.name;

    if (name === "hex_color"){
        const hextorgb = this.onChangeHEX(value);

        this.setState({
          bg_color:value,
          hex_color:value,
          rgb_color:hextorgb
        })
    }
    else{
      const separate_rgb_color = value.replace("rgb(","").replace(")","").split(','),
            red = separate_rgb_color[0],
            green = separate_rgb_color[1],
            blue = separate_rgb_color[2];

      const rgbtohex = this.onChangeRGB(red,green,blue);

      this.setState({
        bg_color:rgbtohex,
        hex_color:rgbtohex,
        rgb_color:value
      })
    }

  }
  onClickHex = (evt) => {
    this.setState({
     hex_color:"#"
    })
  }
  onClickRgb = (evt) => {
    this.setState({
      rgb_color:"rgb(,,)"
    })
  }
  onChangeHEX = (hex) => {
    const hex_remove_hashtag = hex.replace('#',''),
				  bigint = parseInt(hex_remove_hashtag, 16),
			    r = (bigint >> 16) & 255,
				  g = (bigint >> 8) & 255,
				  b = bigint & 255;

    return 'rgb('+ r + "," + g + "," + b + ')';
  }
  onChangeRGB = (r,g,b) => {
    const rgb = b | (g << 8) | (r << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }
  render() {
    return (
      <div className="container-app" style={{backgroundColor: this.state.bg_color}}>
          <div className="form-colors">
              <div className="form-color-input">
                  <input type="text" name="hex_color" placeholder="hex" autoComplete="off" value={this.state.hex_color} onChange={this.onChangeColor.bind(this)} onClick={this.onClickHex.bind(this)}/>
              </div>
              <div className="form-color-input">
                  <input type="text" name="rgb_color" placeholder="rgb" autoComplete="off" value={this.state.rgb_color} onChange={this.onChangeColor.bind(this)} onClick={this.onClickRgb.bind(this)}/>
              </div>
          </div>
          <div className="footer-copyright">
            <p>This design is based on this website <a href="https://www.webpagefx.com/web-design/hex-to-rgb/" target="_blank" rel="noopener noreferrer">https://www.webpagefx.com/web-design/hex-to-rgb/</a></p>
          </div>
      </div>

    );
  }
}

export default Color;
