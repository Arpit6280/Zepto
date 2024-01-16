import React, { useEffect, useRef, useState } from "react";
import "./multiselect.css";

function Multiselect() {
  // Users Data
  const initialUsers = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      username: "Elva McDonald",
      email: "elva@gmail.com",
      amount: "3.668",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Linnie Nelson",
      email: "linnie@gmail.com",
      amount: "3.256",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Brent Reeves",
      email: "brent@gmail.com",
      amount: "2.998",
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Adeline Watson",
      email: "adeline@gmail.com",
      amount: "2.512",
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Juan Harrington",
      email: "juan@gmail.com",
      amount: "2.134",
    },
    {
      id: 6,
      img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Augusta McGee",
      email: "augusta@gmail.com",
      amount: "1.932",
    },
    {
      id: 7,
      img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Angel Thomas",
      email: "angel@gmail.com",
      amount: "1.560",
    },
    // Add more items as needed
  ];

  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedItem, setHighlightedItem] = useState({});
  const [showUsers, setShowUser] = useState(false);
  const [items] = useState(initialUsers);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // useEffect
      if (listRef.current && !listRef.current.contains(e.target)) {
        setShowUser(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showUsers]);

  // On change of input
  const handleInputChange = (e) => {
    const { value, keyCode } = e.target;
    if (keyCode === 8 && value === "" && selectedItems.length > 0) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      setHighlightedItem(lastSelectedItem);
    } else {
      setInputValue(value);
      setHighlightedItem({});

      setShowUser(true);
    }
  };

  // To handle backspace case
  const handleBackspacePress = () => {
    if (Object.keys(highlightedItem).length > 0) {
      handleChipRemove(highlightedItem);
      setHighlightedItem({});
    } else if (selectedItems.length > 0) {
      setHighlightedItem(selectedItems[selectedItems.length - 1]);
    }
  };

  // on selecting user from list
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
    setShowUser(true);
  };

  // Delete chips
  const handleChipRemove = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
    setShowUser(true);
  };

  // filter data
  const filteredItems = items.filter(
    (item) =>
      !selectedItems.includes(item) &&
      item.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="multiSelectContainer">
      <div className="searchWrapper">
        {selectedItems.map((item, index) => (
          <span
            key={item.email}
            className={`chip ${
              highlightedItem.email === item.email ? "highlight" : ""
            }`}
          >
            {" "}
            <img src={item.img} alt={item.username} className="img2" />
            {item.username}
            <span className="closeIcon" onClick={() => handleChipRemove(item)}>
              X
            </span>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add a user"
          className="searchBox"
          value={inputValue}
          onFocus={() => {
            setShowUser(true);
          }}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspacePress()}
          ref={inputRef}
        />
      </div>
      {showUsers && (
        <div ref={listRef} className={`optionListContainer `}>
          <ul className="optionContainer ">
            {filteredItems.map((item) => (
              <li
                key={item.email}
                className="option"
                onClick={() => handleItemClick(item)}
              >
                <div style={{ display: "flex" }}>
                  <img src={item.img} alt={item.username} className="img" />
                  <p style={{ marginRight: "0.5rem" }}>{item.username} </p>
                </div>
                <p> {item.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Multiselect;
