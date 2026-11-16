import React, { useState } from "react";
import "./FilterEtiquettes.css";
export default function Activites() {
  const [state, setState] = useState({ alphabet: "A" });
  const [itemList, setItemList] = useState([
    { id: 1, name: "Assureur", isChecked: false },
    { id: 2, name: "Agence imobilière", isChecked: false },
    { id: 3, name: "Agence matrimoniale", isChecked: false },
    { id: 4, name: "bbbbbb", isChecked: false },
    { id: 5, name: "ewyur", isChecked: false },
    { id: 6, name: "ccccc", isChecked: false },
    { id: 7, name: "gbhfvd", isChecked: false },
    { id: 8, name: "wgtaqe", isChecked: false },
    { id: 9, name: "ab", isChecked: false },
    { id: 10, name: "bcd", isChecked: false },
    { id: 11, name: "cde", isChecked: false },
  ]);

  const onAlphabetClick = (e) => {
    setState({ alphabet: e.target.value });
  };
  const prepareAlphabets = () => {
    let result = [];
    for (let i = 65; i < 91; i++) {
      result.push(
        <button
          type="button"
          key={i}
          className={
            String.fromCharCode(i) == state.alphabet ? "active" : "alpha"
          }
          onClick={onAlphabetClick}
          value={String.fromCharCode(i)}
        >
          {i == 90 ? String.fromCharCode(i) : String.fromCharCode(i) + "|"}
        </button>
      );
    }
    return result;
  };
  const elementContainsSearchString = (searchInput, element) =>
    searchInput
      ? element.name.toLowerCase().includes(searchInput.toLowerCase())
      : false;
  const filterItems = (itemList) => {
    let result = [];
    const { searchInput, alphabet } = state;
    if (itemList && (searchInput || alphabet)) {
      result = itemList.filter(
        (element) =>
          element.name.charAt(0).toLowerCase() === alphabet.toLowerCase() ||
          elementContainsSearchString(searchInput, element)
      );
    } else {
      result = itemList || [];
    }
    result = result.map((item, i) => <li key={i}>{item.name}</li>);
    return result;
  };

  // const itemList = undefined;
  const filteredList = filterItems(itemList);
  const onAddingItem = (i) => (event) => {
    this.setState((state, props) => {
      state.filteredList[i].isChecked = !state.filteredList[i].isChecked;
      return {
        filteredList: state.filteredList,
      };
    });
  };
  return (
    <div className="bodys Ac">
      {prepareAlphabets()}
      <ul>
        {filteredList.map((item, i) => (
          <li key={i}>
            {" "}
            <div className="checkbox checkbox-circle checkbox-color-scheme">
              <input
                type="checkbox"
                value={item.props.children}
                checked={state.alphabet[i]}
                onChange={onAddingItem()}
              />
              <span className="cr"> {item.props.children} </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
