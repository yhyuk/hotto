import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const PostWrite = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagList = tags?.split(',').map(tag => tag.trim()); // 태그 앞뒤 공백 제거

        // 태그 5개 체크
        if (tagList?.length > 5) {
            alert('태그는 최대 5개까지만 입력할 수 있습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/posts', {
                nickname,
                password, 
                title,
                content,
                tagNames: tagList, 
            });

            if (response.status === 200) {
                navigate('/posts');
            }
        } catch (error) {
            alert('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <PostContainer>
            <TopContainer>
                <Title onClick={() => navigate('/posts')}>커뮤니티</Title>
            </TopContainer>
            <TopLine />
            <PostWriteContainer>
                <Form onSubmit={handleSubmit}>
                    <InlineFormGroup>
                        <FormGroup>
                            <Label>닉네임</Label>
                            <Input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>비밀번호</Label>
                            <Input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </InlineFormGroup>
                    <FormGroup>
                        <Label>제목</Label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='제목을 입력해주세요.'
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>내용</Label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='내용을 입력해주세요.'
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>태그 (콤마로 구분)</Label>
                        <Input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="태그를 입력하세요, 예: 태그1, 태그2, 태그3"
                        />
                    </FormGroup>
                    <SubmitButton type="submit">게시글 작성</SubmitButton>
                </Form>
            </PostWriteContainer>
        </PostContainer>
    );
};

export default PostWrite;

const PostContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 450px; 
    box-sizing: border-box;

    @media (max-width: 625px) {
        max-width: 425px;
    }
`;

const PostWriteContainer = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

const TopContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
`

const TopLine = styled.hr`
    border: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`

const Title = styled.h2`
    text-align: left;
    cursor: pointer;
    margin: 0;
    margin-bottom: 6px;

    &:hover {
        color: #0073e6;
    }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 1; /* 동일한 비율로 공간 차지 */

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const InlineFormGroup = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  
  @media (max-width: 480px) {
    flex-direction: column; /* 모바일에서 세로 정렬 */
    gap: 10px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  resize: none;
  height: 100px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
