import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const naver = (window as any).naver;
    let naverLogin: any;

    const login = () => {
      naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        callbackUrl: "http://localhost:3000", // Callback URL
        isPopup: false, // 팝업 형태로 인증 여부
        loginButton: {
          color: "green", // 색상
          type: 3, // 버튼 크기
        },
      });

      naverLogin?.init();
    };

    const getToken = () => {
      const hash = router.asPath.split("#")[1]; // 네이버 로그인을 통해 전달받은 hash 값
      if (hash) {
        const token = hash.split("=")[1].split("&")[0]; // token값 확인
        naverLogin.getLoginStatus((status: any) => {
          if (status) {
            // 로그인 상태 값이 있을 경우
            console.log(naverLogin.user); // 사용자 정보 조회

            router.push({
              pathname: "/calendar",
            });
          }
        });
      }
    };

    login();
    getToken();
  }, []);

  return (
    <div
      className={
        "w-full h-screen bg-orange-500 flex flex-col justify-center items-center"
      }
    >
      <span className="text-[45px] font-bold text-white">Have a Carrot</span>
      <span className="text-[25px] font-semibold text-white">
        열심히 달려온 나에게
      </span>
      <span className="text-6xl text-white">-</span>{" "}
      <button id="naverIdLogin" className="w-44 h-8"></button>
    </div>
  );
}
