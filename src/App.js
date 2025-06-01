import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [addFriendState, setAddFriendState] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriendState() {
    setAddFriendState(!addFriendState);
  }
  function handleSelection(friend) {
    setSelectedFriend(friend);
    setAddFriendState(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        ></FriendList>
        {addFriendState && (
          <FormAddFriend
            friendList={friendList}
            setFriendList={setFriendList}
            setAddFriendState={setAddFriendState}
          ></FormAddFriend>
        )}
        <Button state={addFriendState} onClick={handleAddFriendState}>
          {addFriendState ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          friendList={friendList}
          setFriendList={setFriendList}
        ></FormSplitBill>
      )}
    </div>
  );
}
function Button({ children, onClick, state }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FriendList({ friendList, onSelection, selectedFriend }) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe You {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>{friend.name} and You are even</p>}
      <Button
        onClick={() =>
          selectedFriend === friend ? onSelection(null) : onSelection(friend)
        }
      >
        {selectedFriend === friend ? "close" : "Select"}
      </Button>
    </li>
  );
}
function FormAddFriend({ friendList, setFriendList, setAddFriendState }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !img) return;
    const id = crypto.randomUUID();
    const addNewFriend = {
      name,
      id: crypto.randomUUID(),
      image: `${img}?=${id}`,
      balance: 0,
    };
    setFriendList([...friendList, addNewFriend]);
    setAddFriendState(false);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♂️ Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(() => e.target.value)}
        type="text"
      ></input>

      <label> 🏞️Image URL</label>
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(() => e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({
  selectedFriend,
  setSelectedFriend,
  friendList,
  setFriendList,
}) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : bill;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    const remBalance = whoIsPaying === "user" ? friendExpense : -yourExpense;
    setFriendList(
      friendList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + remBalance }
          : friend
      )
    );
    setBill("");
    setYourExpense("");
    setWhoIsPaying("user");
    setSelectedFriend(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        type="text"
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
        type="text"
      />

      <label>🙋🏻{selectedFriend.name} expense</label>
      <input value={friendExpense} type="text" disabled></input>

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
