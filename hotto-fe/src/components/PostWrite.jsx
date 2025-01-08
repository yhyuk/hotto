import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostWrite = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagList = tags.split(',').map(tag => tag.trim()); // 태그 앞뒤 공백 제거

        // 태그 5개 체크
        if (tagList.length > 5) {
            alert('태그는 최대 5개까지만 입력할 수 있습니다.');
            return; 
        }

        try {
            const response = await axios.post('http://localhost:8080/posts', {
                nickname,
                password, // 비밀번호도 함께 전송
                title,
                content,
                tagNames: tagList, // 태그를 List<String> 형태로 전송
            });
            if (response.status === 200) {
                alert('게시글이 성공적으로 작성되었습니다.');
                navigate('/posts'); // 홈 페이지로 이동
            }
        } catch (error) {
            alert('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>닉네임:</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                    <label>비밀번호:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>태그 (콤마로 구분):</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)} // 태그 상태 업데이트
                        placeholder="태그를 입력하세요, 예: 태그1, 태그2, 태그3"
                    />
                </div>
                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );
};

export default PostWrite;
