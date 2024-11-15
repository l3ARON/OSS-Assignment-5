import React, { useState, useEffect } from 'react';
import GetData from './GetData';
import AddData from './AddData';
import './ShowList.css';

function ShowList() {
    const [players, setPlayers] = useState([]); // 플레이어 리스트 상태
    const [editingPlayer, setEditingPlayer] = useState(null); // 수정 중인 플레이어 정보
    const [showList, setShowList] = useState(false); // 리스트 보기 상태

    // MockAPI에서 플레이어 데이터 가져오기
    const fetchPlayers = async () => {
        try {
            const response = await fetch("https://672818aa270bd0b975544f46.mockapi.io/api/v1/players");
            if (!response.ok) throw new Error("데이터를 불러오는 중 오류 발생!");
            const data = await response.json();
            setPlayers(data);
            setShowList(true); // 보기 버튼을 눌렀을 때만 리스트 보이도록 설정
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        }
    };

    // 새 플레이어 추가
    const addPlayer = async (newPlayer) => {
        try {
            const response = await fetch("https://672818aa270bd0b975544f46.mockapi.io/api/v1/players", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPlayer),
            });

            if (response.ok) {
                const addedPlayer = await response.json();
                setPlayers((prevPlayers) => [...prevPlayers, addedPlayer]);
                alert("추가 성공!");
            } else {
                console.error("플레이어 추가 실패:", response.statusText);
            }
        } catch (error) {
            console.error("플레이어 추가 중 오류가 발생했습니다:", error);
        }
    };

    //삭제
    const deletePlayer = async (id) => {
        try {
            await fetch(`https://672818aa270bd0b975544f46.mockapi.io/api/v1/players/${id}`, {
                method: "DELETE",
            });
            setPlayers(players.filter((player) => player.id !== id));
            alert("삭제 성공!");
        } catch (error) {
            console.error("플레이어 삭제 중 오류가 발생했습니다:", error);
        }
    };

    // 수정
    const updatePlayer = async (updatedPlayer) => {
        try {
            const response = await fetch(`https://672818aa270bd0b975544f46.mockapi.io/api/v1/players/${updatedPlayer.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPlayer),
            });

            if (response.ok) {
                const newPlayerData = await response.json();
                setPlayers(players.map((player) => (player.id === newPlayerData.id ? newPlayerData : player)));
                alert("수정 성공!");
            }
        } catch (error) {
            console.error("플레이어 수정 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <div>
            <h1>Player Management</h1>

            <div className='div_first'>
                <button className='div_in' onClick={fetchPlayers}>보기</button>
                <AddData className='div_in' addPlayer={addPlayer} editingPlayer={editingPlayer} updatePlayer={updatePlayer} setEditingPlayer={setEditingPlayer} />
            </div>
            
            <div className='div_first'>
                <div className="data_in">ID</div>
                <div className="data_in">NAME</div>
                <div className="data_in">Total Goals</div>
                <div className="data_in">Total Assists</div>
                <div className="data_in">Nationality</div>
                <div className="data_in">BACK NUMBER</div>
                <div className="data_in">Actions</div>
            </div>
            {showList && <GetData players={players} deletePlayer={deletePlayer} setEditingPlayer={setEditingPlayer} />}
        </div>
    );
}

export default ShowList;
