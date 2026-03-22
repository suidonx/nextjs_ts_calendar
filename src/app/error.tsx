"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="font-semibold">予期せぬエラーが発生しました</h2>
      <Link href={"/"}>ホームに戻る</Link>
    </div>
  );
};

export default Error;
