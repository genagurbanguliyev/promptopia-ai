import React from "react";
import PromptCard from "@components/PromptCard";

const Profile = (props) => {
  const { data, desc, name, handleEdit, handleDelete } = props;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
