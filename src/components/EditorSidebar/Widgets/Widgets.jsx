import React, { useEffect, useRef } from "react";
import iconClose from "../../../assets/imgEditorSidebar/iconClose.png";
import { useState } from "react";
import "./Widgets.css";
import { useParams } from "react-router-dom";
function Widgets(props) {
  let { siteId, type, pageId } = useParams();

  let [blocks, setBlocks] = useState(null);
  const b = null;
  const CloseTab = () => {
    props.close();
  };
 let List = ["BASICS", "POPULAIRES", "FORMULAIRES",  "BLOGS"];
  //let List = ["BASICS", "POPULAIRES", "FORMULAIRES"]; // without blog widgets
  useEffect(() => {
    if (props) {
     
      const blockManager = props.editor().Blocks;
      const blocks = blockManager.getAll();
      const filtered = blocks.filter((block) =>{
        if(List.includes(block.getCategoryLabel()) ){
          if(type == "model"){
            if( !block.getLabel().includes("Tous les articles")){
              return block
            }
          
          }else if(!block.getLabel().includes("Text blog") ){
              return block
          }
        }
      
      }
      );
      setBlocks(blockManager.render(filtered));
    }
  }, [props]);
  useEffect(() => {
    const container = document.getElementById("widgetsPanel");
    container.innerHTML = "";
    container.append(blocks);
  }, [blocks]);
  const [searchTerm, setSearchTerm] = useState("");
  // const handleSearch = () => {
  //   const blockManager = props.editor().Blocks.blocksView.collection.models;

  //   const searchTermS = searchTerm.toLowerCase(); // Replace 'some-id' with the id you want to search for (in lowercase)

  //   const filteredData = blockManager.filter((item) =>{

  //     const label = item.attributes.id.toLowerCase();
  //     // console.log(label.includes(searchTermS))
  //     if(label.includes(searchTermS) === true){
  //    return item.attributes.id.toLowerCase();
  //     }
  //   }

  //    // item.attributes.id.toLowerCase().includes(searchTermS)
  //   );
  //   // console.log(searchTermS)

  // console.log('----------->', filteredData);
  // };

  props.editor().on("load", () => {
    // Your code to access editor.Panels goes here
    props.editor.Panels.addButton("options", {
      id: "show-blocks",
      className: "fa fa-th-large", // Icon class for the button
      command: "show-blocks",
      attributes: {
        title: "Show Blocks",
      },
    });
  });

  props.editor().Commands.add("show-blocks", {
    run: function (editor, sender, options) {
      // Toggle the blocks panel visibility
      editor.getContainer().closest(".gjs").classList.toggle("blocks-visible");
    },
    stop: function (editor, sender, options) {
      // Hide the blocks panel when the command is stopped
      editor.getContainer().closest(".gjs").classList.remove("blocks-visible");
    },
  });

  // Add a custom panel for block filtering
  const panelManager = props.editor().Panels;
  panelManager.addPanel({
    id: "custom",
    el: ".custom-panel",
  });
  // const filterInput = document.getElementById("block-filter");
  // console.log("blockFilterInput");
  // console.log(filterInput);
  // if (filterInput) {
  //   filterInput.addEventListener("input", function () {
  //     const filterValue = filterInput.value.toLowerCase();
  //     const blocks = props.editor().BlockManager.getAll();

  //     blocks.forEach(function (block) {

  //       const blockName = block.get("id");
  //       const blockEl = block.get("el");
  //       // console.log(blockName)
  //       console.log(blockName)
  //       // if (blockName.includes(filterValue)) {
  //       //   blockEl.style.display = "block";
  //       // } else {
  //       //   blockEl.style.display = "none";
  //       // }
  //     });
  //   });
  // }

  useEffect(() => {
    const container = document.getElementById("widgetsPanel");
    container.innerHTML = "";
    const blockManager = props.editor().Blocks;
    const blocks = blockManager.getAll();
    // console.log(blocks);
    const filtered = blocks.filter((block) => {
      // console.log(block.get("id"));
      // console.log(searchTerm);
      // console.log(
      //   block.get("id").toLowerCase().indexOf(searchTerm.toLowerCase())
      // );
      // console.log(block.get("category"))
      return (
        block.get("id").toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&    List.includes(block.getCategoryLabel())
      );
    });
    const newBlocksEl = blockManager.render(filtered, { external: true });

    container.append(newBlocksEl);
  }, [searchTerm]);

  return (
    <div>
      <div className="close " onClick={(e) => CloseTab()}>
        <img src={iconClose} alt="close" />
      </div>
      <div class="custom-panel">
        <input
          type="text"
          id="block-filter"
          class="block-filter"
          placeholder="Recherge des widgets"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>
      {/* <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
     <button onClick={handleSearch}>Search</button>
   
    </div> */}
      <div
        className="Widgets mt-2"
        id="widgetsPanel"
        onDragStartCapture={(e) =>
          setTimeout(() => {
            CloseTab();
          }, 300)
        }
      ></div>
    </div>
  );
}

export default Widgets;
