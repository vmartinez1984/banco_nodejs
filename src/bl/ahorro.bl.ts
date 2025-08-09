import { AhorroDto, MovimientoDtoIn } from "../dtos/ahorro.dto";
import { SpeiOutDto, SpeiUpdDto } from "../dtos/spei.dto";
import { TranferenciaPorSpeiDto } from "../dtos/transferenciaPorClabe.dto";
import { MovimientoEntity } from "../entities/movimiento.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { DepositoRepository } from "../repositories/deposito.repository";
import { MovimientoRepository } from "../repositories/movimiento.repository";
import { BanxicoService } from "../services/banxico.services";

export class AhorroBl {
  async actualizarEstadoDelSpeiAsync(speiUpdDto: SpeiUpdDto) {
    switch (speiUpdDto.estado) {
      case "Aceptado":
        speiUpdDto.estado = "Aceptado";
        break;
      case "Devuelto":
        const ahorro = await this.ahorroRepository.obtenerPorClabeAsync(
          speiUpdDto.clabeDeOrigen
        );
        const transferencia: TranferenciaPorSpeiDto = {
          clabeDestino: speiUpdDto.clabeDestino,
          concepto: speiUpdDto.concepto,
          encodedkey: speiUpdDto.encodedKey,
          monto: speiUpdDto.monto,
          nombreDelBenificiario: speiUpdDto.nombreDelBeneficiario,
          referencia: speiUpdDto.referencia,
        };
        const movimientoId = await this.reversarEnvioSpeiAsync(
          ahorro.id,
          transferencia
        );
        break;
    }
  }

  async trasferirPorSpeiAsync(
    transferencia: TranferenciaPorSpeiDto,
    bancoDestino: string,
    clabeDeOrigen: string,
    ahorroId: string,
    clienteGuid: string
  ) {
    let spei: SpeiOutDto;

    const clienteEntity = await this.clienteRepository.obtenerPorIdAsync(
      clienteGuid
    );
    spei = {
      clabeDestino: transferencia.clabeDestino,
      bancoDestino: bancoDestino,
      bancoOrdenante: "Banobras",
      clabeDeOrigen: clabeDeOrigen,
      concepto: transferencia.concepto,
      encodedKey: transferencia.encodedkey,
      monto: transferencia.monto,
      nombreDelBeneficiario: transferencia.nombreDelBenificiario,
      nombreDelOrdente:
        clienteEntity.nombre +
        " " +
        clienteEntity.primerApellido +
        " " +
        clienteEntity.segundoApellido,
      referencia: transferencia.referencia,
    };
    console.log("SpeiOutDto", spei);
    //Retirar la cantidad el ahorro
    const movimientoId = await this.retirarParaEnvioSpeiAsync(
      ahorroId,
      transferencia
    );
    try {
      await this.banxicoService.SpeiOutAsync(spei);
    } catch (error) {
      //Devolver el dinero
      const movimientoId = await this.reversarEnvioSpeiAsync(
        ahorroId,
        transferencia
      );
      throw error;
    }
  }

  async reversarEnvioSpeiAsync(
    ahorroId: string,
    transferencia: TranferenciaPorSpeiDto
  ) {
    const ahorro = await this.ahorroRepository.obtenerPorIdAsync(ahorroId);
    let movimientoEntity: MovimientoEntity = {
      canalEncodedkey: "Spei out error",
      monto: transferencia.monto,
      saldoInicial: ahorro.saldo,
      saldoFinal: ahorro.saldo + transferencia.monto,
      concepto: transferencia.concepto,
      ahorroEncodedKey: ahorro.guid,
      ahorroId: ahorro.id,
      encodedKey: transferencia.encodedkey,
      referencia: transferencia.referencia,
      tipo: "deposito",
      id: 0,
    };
    ahorro.saldo = movimientoEntity.saldoFinal;
    await this.ahorroRepository.actualizarAsync(ahorro);
    const movimientoId = await this.movimientoRepository.agregarAsync(
      movimientoEntity
    );

    return movimientoId;
  }

  // agregarAsync(deposito: DepositoDtoIn): number {
  //     let depositoId
  //     let depositoEntity : DepositoEntity = {
  //         clienteGuid : deposito.clienteGuid,
  //         clabe: ''
  //     }
  //     depositoId = this.depositoRepository.agregarAsync(depositoEntity)
  //     depositoEntity.clabe = this.clabeService.obtenerClabeAsync(depositoId.toString())
  //     this.depositoRepository.actualizarAsync(depositoEntity)

  //     return 0
  // }

  async obtenerPorClienteIdAsync(clienteId: string): Promise<AhorroDto[]> {
    let depositos: AhorroDto[] = [];
    let entities;

    entities = await this.ahorroRepository.obtenerPorClienteIdAsync(clienteId);
    //console.log(entities)
    entities.forEach((item) => {
      depositos.push(
        new AhorroDto(
          item.id,
          item.clabe,
          item.nombre,
          item.clienteGuid,
          Number(item.saldo)
        )
      );
    });

    return depositos;
  }

  async obtenerPorIdAsync(depositoId: string): Promise<AhorroDto> {
    let ahorroEntity;

    ahorroEntity = await this.ahorroRepository.obtenerPorIdAsync(depositoId);
    //console.log(ahorroEntity)

    return new AhorroDto(
      ahorroEntity.id,
      ahorroEntity.clabe,
      ahorroEntity.nombre,
      ahorroEntity.clienteGuid,
      ahorroEntity.saldo
    );
  }

  async depositarAsync(
    ahorroId: string,
    deposito: MovimientoDtoIn
  ): Promise<number> {
    let ahorro = await this.ahorroRepository.obtenerPorIdAsync(ahorroId);
    let movimientoEntity: MovimientoEntity = {
      canalEncodedkey: "cash",
      monto: deposito.cantidad,
      saldoInicial: ahorro.saldo,
      saldoFinal: ahorro.saldo + deposito.cantidad,
      concepto: deposito.concepto,
      ahorroEncodedKey: ahorro.guid,
      ahorroId: ahorro.id,
      encodedKey: deposito.encodedKey,
      referencia: deposito.referencia,
      tipo: "deposito",
      id: 0,
    };
    ahorro.saldo = movimientoEntity.saldoFinal;
    await this.ahorroRepository.actualizarAsync(ahorro);
    let movimientoId = await this.movimientoRepository.agregarAsync(
      movimientoEntity
    );

    return movimientoId;
  }

  async retirarAsync(
    depositoId: string,
    deposito: MovimientoDtoIn
  ): Promise<number> {
    const ahorro = await this.ahorroRepository.obtenerPorIdAsync(depositoId);
    if (deposito.cantidad > Number(ahorro.saldo))
      throw new Error("Saldo insuficiente para retirar");
    let movimientoEntity: MovimientoEntity = {
      canalEncodedkey: "cash",
      monto: deposito.cantidad,
      saldoInicial: ahorro.saldo,
      saldoFinal: ahorro.saldo + deposito.cantidad,
      concepto: deposito.concepto,
      ahorroEncodedKey: ahorro.guid,
      ahorroId: ahorro.id,
      encodedKey: deposito.encodedKey,
      referencia: deposito.referencia,
      tipo: "deposito",
      id: 0,
    };
    ahorro.saldo = movimientoEntity.saldoFinal;
    await this.ahorroRepository.actualizarAsync(ahorro);
    const movimientoId = await this.movimientoRepository.agregarAsync(
      movimientoEntity
    );

    return movimientoId;
  }

  async retirarParaEnvioSpeiAsync(
    ahorroId: string,
    transferencia: TranferenciaPorSpeiDto
  ): Promise<number> {
    const ahorro = await this.ahorroRepository.obtenerPorIdAsync(ahorroId);
    if (transferencia.monto > Number(ahorro.saldo))
      throw new Error("Saldo insuficiente para retirar");
    let movimientoEntity: MovimientoEntity = {
      canalEncodedkey: "Spei out",
      monto: transferencia.monto,
      saldoInicial: ahorro.saldo,
      saldoFinal: ahorro.saldo - transferencia.monto,
      concepto: transferencia.concepto,
      ahorroEncodedKey: ahorro.guid,
      ahorroId: ahorro.id,
      encodedKey: transferencia.encodedkey,
      referencia: transferencia.referencia,
      tipo: "deposito",
      id: 0,
    };
    ahorro.saldo = movimientoEntity.saldoFinal;
    await this.ahorroRepository.actualizarAsync(ahorro);
    const movimientoId = await this.movimientoRepository.agregarAsync(
      movimientoEntity
    );

    return movimientoId;
  }

  private ahorroRepository: DepositoRepository;
  private movimientoRepository: MovimientoRepository;
  private banxicoService: BanxicoService;
  private clienteRepository: ClienteRepository;

  constructor() {
    this.ahorroRepository = new DepositoRepository();
    this.movimientoRepository = new MovimientoRepository();
    this.banxicoService = new BanxicoService();
    this.clienteRepository = new ClienteRepository();
  }
}
