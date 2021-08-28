# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import medicamento_pb2 as medicamento__pb2


class MedicServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetAll = channel.unary_unary(
                '/MedicService/GetAll',
                request_serializer=medicamento__pb2.Empty.SerializeToString,
                response_deserializer=medicamento__pb2.MedicamentoList.FromString,
                )
        self.InsertType = channel.unary_unary(
                '/MedicService/InsertType',
                request_serializer=medicamento__pb2.TipoMedicamento.SerializeToString,
                response_deserializer=medicamento__pb2.TipoMedicamento.FromString,
                )
        self.RemoveType = channel.unary_unary(
                '/MedicService/RemoveType',
                request_serializer=medicamento__pb2.TipoMedicamento.SerializeToString,
                response_deserializer=medicamento__pb2.MedicamentoList.FromString,
                )
        self.Insert = channel.unary_unary(
                '/MedicService/Insert',
                request_serializer=medicamento__pb2.Medicamento.SerializeToString,
                response_deserializer=medicamento__pb2.Medicamento.FromString,
                )
        self.GetByType = channel.unary_unary(
                '/MedicService/GetByType',
                request_serializer=medicamento__pb2.TipoMedicamento.SerializeToString,
                response_deserializer=medicamento__pb2.MedicamentoList.FromString,
                )
        self.GetByInicial = channel.unary_unary(
                '/MedicService/GetByInicial',
                request_serializer=medicamento__pb2.Inicial.SerializeToString,
                response_deserializer=medicamento__pb2.MedicamentoList.FromString,
                )


class MedicServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetAll(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def InsertType(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RemoveType(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Insert(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetByType(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetByInicial(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_MedicServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetAll': grpc.unary_unary_rpc_method_handler(
                    servicer.GetAll,
                    request_deserializer=medicamento__pb2.Empty.FromString,
                    response_serializer=medicamento__pb2.MedicamentoList.SerializeToString,
            ),
            'InsertType': grpc.unary_unary_rpc_method_handler(
                    servicer.InsertType,
                    request_deserializer=medicamento__pb2.TipoMedicamento.FromString,
                    response_serializer=medicamento__pb2.TipoMedicamento.SerializeToString,
            ),
            'RemoveType': grpc.unary_unary_rpc_method_handler(
                    servicer.RemoveType,
                    request_deserializer=medicamento__pb2.TipoMedicamento.FromString,
                    response_serializer=medicamento__pb2.MedicamentoList.SerializeToString,
            ),
            'Insert': grpc.unary_unary_rpc_method_handler(
                    servicer.Insert,
                    request_deserializer=medicamento__pb2.Medicamento.FromString,
                    response_serializer=medicamento__pb2.Medicamento.SerializeToString,
            ),
            'GetByType': grpc.unary_unary_rpc_method_handler(
                    servicer.GetByType,
                    request_deserializer=medicamento__pb2.TipoMedicamento.FromString,
                    response_serializer=medicamento__pb2.MedicamentoList.SerializeToString,
            ),
            'GetByInicial': grpc.unary_unary_rpc_method_handler(
                    servicer.GetByInicial,
                    request_deserializer=medicamento__pb2.Inicial.FromString,
                    response_serializer=medicamento__pb2.MedicamentoList.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'MedicService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class MedicService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetAll(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/GetAll',
            medicamento__pb2.Empty.SerializeToString,
            medicamento__pb2.MedicamentoList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def InsertType(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/InsertType',
            medicamento__pb2.TipoMedicamento.SerializeToString,
            medicamento__pb2.TipoMedicamento.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RemoveType(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/RemoveType',
            medicamento__pb2.TipoMedicamento.SerializeToString,
            medicamento__pb2.MedicamentoList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Insert(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/Insert',
            medicamento__pb2.Medicamento.SerializeToString,
            medicamento__pb2.Medicamento.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetByType(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/GetByType',
            medicamento__pb2.TipoMedicamento.SerializeToString,
            medicamento__pb2.MedicamentoList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetByInicial(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MedicService/GetByInicial',
            medicamento__pb2.Inicial.SerializeToString,
            medicamento__pb2.MedicamentoList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)