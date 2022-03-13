import React, { useState , useEffect } from 'react';

import '../App.css'
import { DragDropContext , Droppable , Draggable} from 'react-beautiful-dnd';
// import uuid from "uuid/v4";
import { v4 as uuidv4 } from 'uuid';

const Cards = () => {
    const [sublist,setSublist] = useState(0)
    const [text,setText] = useState("");
    const [note,setNote] = useState("");
    var [data , setData] = useState([
        {
         name:"first",
         id:"1"
        },
        
    ])

    

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "To do",
    items: []
  },
  [uuidv4()]: {
    name: "In Progress",
    items: []
  },
  [uuidv4()]: {
    name: "Done",
    items: []
  }
};


const [columns, setColumns] = useState(columnsFromBackend);

    const clickHandle = () => {
        var temp = data;
        const n = temp.length;
        temp.push({
            name:text,
            id: (n+1).toString()
        })
        
        setData(temp);
        console.log(data)
    }

 const reorder = (list, startIndex , endIndex) => {
     const result = Array.from(list);
     const [removed] = result.splice(startIndex , 1);
     result.splice(endIndex,0,removed);

     return result;
 }   

//  const onEnd = (result ,columns) => {
//      if(!result.destination) return;
//      setData(reorder(data, result.source.index ,result.destination.index));
//      console.log(result);
//      console.log(columns);
//  }


const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const addColumn =(text)=>{
        setColumns({
            ...columns,
            [uuidv4()]: {
                name: text,
                items: []
              }
        })
  }

  const addNote = (note ,columnId,columns,setColumns)=>{
      const oldColumn = columns[columnId];
      const oldItems = oldColumn.items;
      oldItems.push({ id: uuidv4(), content: note });
    setColumns({
        ...columns,
        [columnId]: {
          ...oldColumn,
          items: oldItems,
          
        },
      });
  }

    return (
        <>
        <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>

       
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext  onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index)=>
                {
                    return (
                        <div  
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                          key={columnId}>
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                        <Droppable droppableId={columnId} key={columnId}>
                        {(provided,snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500
                            }}>
                         {  column.items.map((item,index) =>{
                             return (
                                <Draggable  
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                    {(provided) => (
                                         <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                         style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style
                                          }}>
                                             {item.content}
                                         </div>
                                     )}
                                
                                 </Draggable>
                                 )
                         } )}

                        {provided.placeholder}
                        {/* <input value={note} onChange={(e)=>setNote(e.target.value)}/> */}
                        <button onClick={() => addNote(text,columnId,columns,setColumns)}>add note</button>
                            </div>
                        )}
                        </Droppable>
                        </div>
                        </div>
                    
                        )
                })}
          
            </DragDropContext>
            
            {/* <input value={text} onChange={(e)=>setText(e.target.value)}/>
            
            <button onClick={clickHandle}>ADD LIST</button> */}
           
        </div>
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder = "enter something then add"/>
        <button style={{width:"40%"}} onClick={() => addColumn(text)}>Add List</button>
        </div>
        </>
    )
}

export default Cards;