import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    // 게시글 목록 가져오기
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

    // 게시글 상세 및 댓글 가져오기
    const toggleDetails = (postId) => {
        if (selectedPost?.id === postId) {
            // 이미 선택된 게시글이면 상세 보기 닫기
            setSelectedPost(null);
        } else {
            axios
                .get(`/posts/${postId}`)
                .then((response) => {
                    setSelectedPost(response.data);
                })
                .catch((error) => {
                    console.error("게시글 상세 정보를 가져오는 중 오류가 발생했습니다.", error);
                });
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <div onClick={() => toggleDetails(post.id)}>
                        <h2>{post.title}</h2>
                        <p>추천: {post.likes}</p>
                    </div>
                    {selectedPost?.id === post.id && (
                        <div>
                            <p>{selectedPost.content}</p>
                            <h3>댓글</h3>
                            <ul>
                                {selectedPost.comments.map((comment) => (
                                    <li key={comment.id}>{comment.content}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;