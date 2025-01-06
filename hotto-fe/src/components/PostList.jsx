import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    // 게시글 목록
    useEffect(() => {
        axios
            .get("http://localhost:8080/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error("게시글을 가져오는 중 오류가 발생했습니다.", error);
            });
    }, []);

    console.log(posts);

    const isNew = (createdAt) => {
        const createdDate = new Date(createdAt); 
        const today = new Date();
    
        return (
            createdDate.getFullYear() === today.getFullYear() &&
            createdDate.getMonth() === today.getMonth() &&
            createdDate.getDate() === today.getDate()
        );    
    }

    const formatTimeAgo = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
    
        const diffMs = now - createdDate; // 밀리초 차이
        const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 분 단위
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 단위
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 일 단위
    
        if (diffMinutes < 60) {
            return `${diffMinutes}분 전`;
        } else if (diffHours < 24 && now.toDateString() === createdDate.toDateString()) {
            return `${diffHours}시간 전`;
        } else {
            return `${diffDays}일 전`;
        }
    };
    
    return (
        <>
            <PostContainer>
                <Title>커뮤니티</Title>
                {posts.map((post) => (
                    <PostItem key={post.id}>
                        <Header>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9.75C11.0711 9.75 12.75 8.07107 12.75 6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6C5.25 8.07107 6.92893 9.75 9 9.75Z" fill="#DADADA" stroke="#DADADA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 15.75C15 14.1587 14.3679 12.6326 13.2426 11.5074C12.1174 10.3821 10.5913 9.75 9 9.75C7.4087 9.75 5.88258 10.3821 4.75736 11.5074C3.63214 12.6326 3 14.1587 3 15.75" stroke="#DADADA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 10C7.4087 10 5.88258 10.6321 4.75736 11.7574C3.63214 12.8826 3 14.4087 3 16H15C15 14.4087 14.3679 12.8826 13.2426 11.7574C12.1174 10.6321 10.5913 10 9 10Z" fill="#DADADA" stroke="#DADADA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <Nickname>{post.nickname}</Nickname>
                            <Time>{formatTimeAgo(post.createdAt)}</Time>
                        </Header>
                        <Content>
                            <Text>{post.title}</Text>
                            {isNew(post.createdAt) && <NewLabel>N</NewLabel>}
                        </Content>
                        <Footer>
                            <Tags>
                                <TagContent>#태그1</TagContent>
                                <TagContent>#태그2</TagContent>
                                <TagContent>#태그3</TagContent>
                            </Tags>
                            <Stats>
                                <Stat>
                                    <StatIcon>
                                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-4 w-4 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>
                                    </StatIcon>
                                    <div>
                                        {post.views}
                                    </div>
                                </Stat>
                                <Stat>
                                    <StatIcon>
                                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-4 w-4 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"></path></svg>
                                    </StatIcon>
                                    <div>
                                        {post.likes}
                                    </div>
                                </Stat>
                                <Stat>
                                    <StatIcon>
                                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-4 w-4 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path></svg>
                                    </StatIcon>
                                    <div>
                                        0
                                    </div>
                                </Stat>
                            </Stats>
                        </Footer>
                    </PostItem>
                ))}
            </PostContainer>
        </>
    );
};

export default PostList;

const Title = styled.h2`
    text-align: left;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
`;

const PostContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 450px; 
    box-sizing: border-box;

    @media (max-width: 625px) {
        max-width: 425px;
    }
`;

const PostItem = styled.div`
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #ddd;

    &:first-child {
        border-top: 1px solid #ddd; /* 첫 번째 게시글에만 위쪽 경계선 추가 */
    }
        
    &:last-child {
        border-bottom: none; 
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Nickname = styled.span`
    font-weight: bold;
    margin-right: 10px;
    margin-left: 8px;
`;

const Time = styled.span`
    font-size: 12px;
    color: #888;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Text = styled.p`

    &:hover {
        cursor: pointer;
        color: #0073e6;
    }
`;

const NewLabel = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background-color: #ff4500;
    border-radius: 3px;
    padding: 2px 5px;
    margin-left: 10px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Tags = styled.div`
    display: flex;
    font-size: 14px;
    color: #0073e6;
`;

const TagContent = styled.div`
    margin-right: 4px;
`;

const Stats = styled.div`
    display: flex;
    gap: 15px;
`;

const Stat = styled.span`
    display: flex;
    font-size: 12px;
    color: #666;
`;

const StatIcon = styled.div`
    margin-right: 4px;
`;
