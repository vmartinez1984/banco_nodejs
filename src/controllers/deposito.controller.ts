import { DepositoDto, MovimientoDtoIn } from "../dtos/deposito.dto";

export class DepositoController{

    obtenerAsync(clienteId: number): DepositoDto[]{
        let depositos: DepositoDto[] =[]

        return depositos
    }

    depositarAsync(depositoId: string,movimiento: MovimientoDtoIn){
        
    }

    retirarAsync(depositoId: string,movimiento: MovimientoDtoIn){
        
    }
}