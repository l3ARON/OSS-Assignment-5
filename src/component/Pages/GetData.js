import React from 'react';
import './GetData.css'; // CSS 파일을 불러옴

function GetData({ players, deletePlayer, setEditingPlayer }) {
    return (
        <div>
            <div className="data">
                {players.map((player) => (
                    <div key={player.id} className="player-row">
                        <div className="data_in">{player.id}</div>
                        <div className="data_in">{player.name}</div>
                        <div className="data_in">{player.total_goal}</div>
                        <div className="data_in">{player.total_assist}</div>
                        <div className="data_in">{player.nationality}</div>
                        <div className="data_in">{player.number}</div>
                        <div className="data_in">
                            <button onClick={() => setEditingPlayer(player)}>수정</button>
                            <button onClick={() => deletePlayer(player.id)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetData;
