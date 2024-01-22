import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  formKeys as loginFormkeys,
  formLabel as loginFormLabel,
} from "./login-config";

export const Login = () => {
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    // 在這裡處理表單提交後的邏輯
    console.log(data);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 使用Controller包裝MUI的TextField元件 */}
        <Controller
          name={loginFormkeys.username}
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
          name={loginFormkeys.password}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};
