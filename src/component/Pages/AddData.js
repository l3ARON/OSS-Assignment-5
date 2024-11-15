import React, { useState, useEffect } from "react";

function AddData({ addPlayer, editingPlayer, updatePlayer, setEditingPlayer }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playerData, setPlayerData] = useState({
        name: "",
        total_goal: "",
        total_assist: "",
        nationality: "",
        number: "",
    });

    // 수정 모드에서 editingPlayer가 바뀔 때 playerData 업데이트
    useEffect(() => {
        if (editingPlayer) {
            setPlayerData(editingPlayer);
            setIsModalOpen(true);
        }
    }, [editingPlayer]);

    // 모달 열기 및 닫기
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPlayer(null);
        setPlayerData({ name: "", total_goal: "", total_assist: "", nationality: "", number: "" });
    };

    // 플레이어 정보 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerData((prevData) => ({ ...prevData, [name]: value }));
    };

    // 플레이어 추가 또는 수정
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

            {/* 모달 창 */}
            {isModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", width: "300px" }}>
                        <h2>{editingPlayer ? "플레이어 수정" : "새 플레이어 추가"}</h2>
                        <label>이름: <input type="text" name="name" value={playerData.name} onChange={handleChange} /></label><br />
                        <label>총 득점: <input type="number" name="total_goal" value={playerData.total_goal} onChange={handleChange} /></label><br />
                        <label>총 어시스트: <input type="number" name="total_assist" value={playerData.total_assist} onChange={handleChange} /></label><br />
                        <label>국적: <input type="text" name="nationality" value={playerData.nationality} onChange={handleChange} /></label><br />
                        <label>등번호: <input type="number" name="number" value={playerData.number} onChange={handleChange} /></label><br /><br />
                        <button onClick={handleSavePlayer}>확인</button>
                        <button onClick={closeModal}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddData;
