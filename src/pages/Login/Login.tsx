import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  Container,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { LoginData } from "./login.type";
import { LoadingButton } from "@mui/lab";
import { formLabel as loginFormLabel } from "./login-config";
import { MuiSnackbar } from "../../components/MuiSnackbar";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { control, handleSubmit } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loginState, setLoginState] = useState<any>({});

  const onSubmit = async (data: LoginData) => {
    try {
      handleSnackbarClose();
      setIsLogining(true);
      const result = await axios.post("/v2/admin/signin", data);
      const { token, expired } = result.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      setIsLogining(false);
      if (result?.data?.success) {
        navigate("/admin/products");
      }
    } catch (error: any) {
      console.log(error);
      setLoginState(error.response.data);
      setIsSnackbarOpen(true);
      setIsLogining(false);
    }
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <MuiSnackbar
        loginState={loginState}
        isOpen={isSnackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
      ></MuiSnackbar>
      <Container
        maxWidth="xs"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 使用Controller包裝MUI的TextField元件 */}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={loginFormLabel.username}
                fullWidth
                margin="normal"
                variant="standard"
              />
            )}
          />

          {/* 使用Controller包裝MUI的TextField元件 */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">
                  {loginFormLabel.password}
                </InputLabel>
                <Input
                  fullWidth
                  {...field}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          />

          {/* 使用Controller包裝MUI的Button元件 */}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLogining}
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </LoadingButton>
        </form>
      </Container>
    </>
  );
};
