import Forgetpassword1 from '@/components/forgetpassword1';
import ForgetPassword2 from '@/components/forgetpassword2';
import ForgetPassword3 from '@/components/forgetpassword3';
import ForgetPassword4 from '@/components/forgetpassword4';

export default function Page() {
    return (
        <div className="h-screen bg-slate-100">
            <div className="w-[1040px] mx-auto pt-28 flex flex-col gap-6">
                <Forgetpassword1 />
                {/* <ForgetPassword2 /> */}
                {/* <ForgetPassword3 /> */}
                {/* <ForgetPassword4 /> */}
            </div>
        </div>
    );
}
