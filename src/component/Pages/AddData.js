import React, { useState, useEffect } from "react";
import './AddData.css'; // CSS 파일을 불러옴

function AddData({ addPlayer, editingPlayer, updatePlayer, setEditingPlayer }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playerData, setPlayerData] = useState({
        name: "",
        total_goal: "",
        total_assist: "",
        nationality: "",
        number: "",
    });

    useEffect(() => {
        if (editingPlayer) {
            setPlayerData(editingPlayer);
            setIsModalOpen(true);
        }
    }, [editingPlayer]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPlayer(null);
        setPlayerData({ name: "", total_goal: "", total_assist: "", nationality: "", number: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSavePlayer = () => {
        if (editingPlayer) {
            updatePlayer(playerData);
        } else {
            addPlayer(playerData);
        }
        closeModal();
    };

    return (
        <div>
            <button onClick={openModal}>추가</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingPlayer ? "플레이어 수정" : "새 플레이어 추가"}</h2>
                        <label>이름: <input type="text" name="name" value={playerData.name} onChange={handleChange} /></label>
                        <label>총 득점: <input type="number" name="total_goal" value={playerData.total_goal} onChange={handleChange} /></label>
                        <label>총 어시스트: <input type="number" name="total_assist" value={playerData.total_assist} onChange={handleChange} /></label>
                        <label>국적: <input type="text" name="nationality" value={playerData.nationality} onChange={handleChange} /></label>
                        <label>등번호: <input type="number" name="number" value={playerData.number} onChange={handleChange} /></label>
                        <button onClick={handleSavePlayer}>확인</button>
                        <button onClick={closeModal}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddData;
