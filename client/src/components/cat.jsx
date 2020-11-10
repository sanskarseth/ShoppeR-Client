import React from 'react';
import '../components/css/cat.css';

const ListGroup = (props) => {

  const {items,onItemSelect,textProperty,valueProperty,selectedItem} = props;

  return(

<div className="navBar2">
    <div className='sections2'>
            {items.map(item => (
            <div 
                key = {item[valueProperty]} 
                className={`${item === selectedItem  ? "selected" : "notselected"} section2`}
                onClick={()=>onItemSelect(item)}
                style={{cursor:'pointer'}}
                > 
                <div className="tx"> {item[textProperty]}</div>
                
            </div>
    ))} 
    </div>
</div>

  );
}

 ListGroup.defaultProps = {
     textProperty:'name',
     valueProperty:'_id'
 };


export default ListGroup;