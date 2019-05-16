export interface Veiculo {
  ROTULO: string,
  ITINERARIO: string,
  VELOCIDADE: number,
  IGNICAO: boolean,
  LOCALIZACAO:
  {
    LONGITUDE: number,
    LATITUDE: number,
    HORARIO: number
  }
}
