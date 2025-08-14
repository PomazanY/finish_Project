import { useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requestPasswordReset, resetPassword } from "../../shared/api/auth-api";

import TextField from "../../shared/components/TextField/TextField";
import ButtonForm from "../../shared/components/ButtonForm/ButtonForm";
import { fields } from "./fields";

import { ResetIcon } from "../../shared/icons"

import styles from "./ResetForm.module.css";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetForm() {
    const q = useQuery();
    const navigate = useNavigate();
    const token = q.get("token"); // если есть — режим ввода нового пароля

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [pending, setPending] = useState(false);
    const [info, setInfo] = useState("");
    const [err, setErr] = useState("");

    const onSubmit = async (values) => {
        setInfo("");
        setErr("");
        setPending(true);

        try {
            if (!token) {
                // режим запроса письма
                await requestPasswordReset(values.identifier.trim());
                setInfo("Если такой email существует, мы отправили письмо для сброса пароля.");
            } else {
                // режим нового пароля
                await resetPassword({ token, password: values.password });
                setInfo("Пароль обновлён. Сейчас перейдёте на вход…");
                setTimeout(() => navigate("/"), 1200);
            }
            reset();
        } catch (e) {
            setErr(e?.response?.data?.error || "Что-то пошло не так.");
        } finally {
            setPending(false);
        }
    };

    const password = watch("password");

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.textField}>
                    <ResetIcon />
                    <h2 className={styles.title}>
                        {token ? "Reset password" : "Trouble logging in?"}
                    </h2>

                    {!token ? (
                        <>
                            <p className={styles.subtitle}>
                                Enter your <b>email</b> and we'll send you a link to get back into your account.
                            </p>

                            <TextField
                                register={register}
                                error={errors.identifier}
                                {...fields.identifier}
                                className={styles.whiteInput}
                            />
                            <ButtonForm type="submit" disabled={pending}>
                                {pending ? "Sending..." : "Reset your password"}
                            </ButtonForm>
                        </>
                    ) : (
                        <>
                            <p className={styles.subtitle}>Create a new password for your account.</p>

                            <input
                                type="password"
                                placeholder="New password"
                                className={styles.whiteInput}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                })}
                            />
                            {errors.password && (
                                <span className={styles.errorMsg}>{errors.password.message}</span>
                            )}

                            <input
                                type="password"
                                placeholder="Confirm password"
                                className={styles.whiteInput}
                                {...register("confirm", {
                                    required: "Confirm your password",
                                    validate: (v) => v === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirm && (
                                <span className={styles.errorMsg}>{errors.confirm.message}</span>
                            )}

                            <ButtonForm type="submit" disabled={pending}>
                                {pending ? "Saving..." : "Update password"}
                            </ButtonForm>
                        </>
                    )}

                    {info && <div className={styles.info}>{info}</div>}
                    {err && <div className={styles.error}>{err}</div>}
                </form>
            </div>

            <div className={styles.wrap}>
                <div className={styles.wraptwo}>
                    <p className={styles.account}>
                        {token ? "Remembered your password?" : "Don't have an account?"}
                    </p>
                    {token ? (
                        <Link to="/" className={styles.login}>Log in</Link>
                    ) : (
                        <Link to="/register" className={styles.login}>Create new account</Link>
                    )}
                </div>
            </div>

            <Link to="/" className={styles.back}>Back to login</Link>
        </div>
    );
}
