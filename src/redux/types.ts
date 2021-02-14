export interface InitialState {
    logined: boolean,
  name: string,
  mail: string,
  password: string,
  chest: number,
  waist: number,
  hips: number,
  height: number,
  age: number,
  color: number,
  hair: string,
  eyes: string,
  style: string,
}

export interface RootState {
    user: InitialState,
}