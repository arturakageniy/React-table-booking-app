import AStyles from "./App.module.css";
import React from 'react';

const STATUS=
{
  Free:"Свободен",
  Booked:"Забронирован",
  Busy:"Занят",
  FreedUp:"Освобождается",
}

let clientXPopup, clientYPopup

class Table extends React.Component 
{ 
  constructor(props) 
  {
    super(props);
    this.state = 
    { 
      Number: props.Number,
      Status:props.Status,
      isPopupOpen: false,
      bookingTime: ''
    };
  }
  
  

  DivTable(props) 
  {
    const getStatusColor = (status) => 
    {
      switch (status) {
        case "Свободен":
          return "green";
        case "Освобождается":
          return "yellow";
        case "Занят":
          return "orange";
        case "Забронирован":
          return "red";
        default:
          return "transparent";
      }
    };

    return (
      <div className={AStyles.box} onClick={props.onClick}>
        <h1>Cтол # { props.Number }</h1>   
          <div className={AStyles.Divstatus}>
            <h1 style={{marginRight:'20px'}}> Состояние - { props.Status }</h1>
            <div style={{ backgroundColor: getStatusColor(props.Status) }} className={AStyles.StatusCircle}></div>
          </div>
          {props.Status === STATUS.Booked && (
          <h2>Бронь на { props.bookingTime }</h2>       
          )}
        </div>
    );
  }

  DivPopup(props) 
  {
    return (
      <div className={AStyles.popup} style={{ left: `${clientXPopup}px`, top : `${clientYPopup}px`}}> 
        <h2>Стол № { props.Number }</h2>
        <div className={AStyles.buttons}>
          <button onClick={props.onClick} >Закрыть</button>
          <button onClick={props.setBooked} >Забронировать</button>  
          <button onClick={props.setFree} >Освободить</button>
          <button onClick={props.setBusy} >Занять</button>
          <button onClick={props.setFreedUp} >Скоро освободится</button>

          <label >Время бронирования</label>
          <input type="time" id="time" name="time"
          onChange={(e) => props.handleTimeChange(e.target.value)}
          />
        </div>

        
      </div>
    );
  }

  openPopup = (props) => 
  {
    this.setState({ isPopupOpen: true });
    console.log(props)
    clientXPopup = props.clientX
    clientYPopup = props.clientY
  };
  
  closePopup = () => 
  {
    this.setState({ isPopupOpen: false });
  };  
  
  handleClick(props) 
  {
    this.state.isPopupOpen? this.closePopup(): this.openPopup(props);
  };

  handleTimeChange = (time) => 
  {
    this.setState({ bookingTime: time });
  };

  setFree()
  {
    this.setState({ Status:STATUS.Free })
    this.setState({ bookingTime:'' })
    this.closePopup();
  }
  setBooked()
  {
    this.setState({ Status:STATUS.Booked })
    this.closePopup();
  }
  setBusy()
  {
    this.setState({ Status:STATUS.Busy })
    this.setState({ bookingTime:'' })
    this.closePopup();
  }
  setFreedUp()
  {
    this.setState({ Status:STATUS.FreedUp })
    this.setState({ bookingTime:'' })
    this.closePopup();
  }

  render() 
  {
    return (
      <div>
        <this.DivTable
          onClick={(e) => { (this.handleClick.bind(this)(e)) }}    
          Status={this.state.Status} 
          Number={this.state.Number} 
          bookingTime = {this.state.bookingTime} 
        />
        {this.state.isPopupOpen && (
          <this.DivPopup 
          Number = { this.state.Number }
          onClick= { this.closePopup } 
          setFree= { this.setFree.bind(this) }
          setBooked= { this.setBooked.bind(this) }
          setBusy= { this.setBusy.bind(this) }
          setFreedUp= { this.setFreedUp.bind(this) }
          handleTimeChange={ this.handleTimeChange.bind(this) }  />
        )}
      </div>
    );
  }
}

export default Table;
