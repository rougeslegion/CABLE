from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .models import Strain, Cul_coll_no
from .serializers import StrainSerializer, CulColNoSerializer

import bacdive
client = bacdive.BacdiveClient('renzo.bcabarco@gmail.com', 'test123123')

# Create your views here.
class TestView(APIView):
    def post(self, request):
        try:
            data = request.data
            print(data)
            return Response(
                {'success', 'POG'},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Sometinhg went wrong while registering.'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class bacdiveView(APIView):
    def post(self, request):
        data = request.data
        print(data)

        endpt = data["endpoint"]

        if endpt == "opt_fe":
            client.search(id=data["query"])
        elif endpt == "opt_ccn":
            client.search(culturecolno=data["query"])
        elif endpt == "opt_tx":
           client.search(taxonomy=data["query"])
        elif endpt == "opt_s16":
            query = {"16s": data["query"]}
            client.search(**query)
        elif endpt == "opt_sge":
            client.search(genome=data["query"])
        else:
            return Response(
                {'error':'Error'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        resp = []

        for strain in client.retrieve():
            resp.append(strain)

        return Response(
            resp
        )
        
        # try:
        #     data = request.data
        #     print(data)

        #     endpt = data["endpoint"]

        #     if endpt == "opt_fe":
        #         client.search(id=data["query"])
        #     elif endpt == "opt_ccn":
        #         client.search(culturecolno=data["query"])
        #     elif endpt == "opt_tx":
        #        client.search(taxonomy=data["query"])
        #     elif endpt == "opt_s16":
        #         client.getIDsBy16S(seq_acc_num=data["query"])
        #     elif endpt == "opt_sge":
        #         client.search(genome=data["query"])
        #     else:
        #         return Response(
        #             {'error':'Error'},
        #             status = status.HTTP_500_INTERNAL_SERVER_ERROR
        #         )

        #     resp = []

        #     for strain in client.retrieve():
        #         resp.append(strain)

        #     return Response(
        #         resp
        #     )
        # except:
        #     return Response(
        #         {'error':'Error'},
        #         status = status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )
        
class getData(APIView):
    def post(self, request):
        try:
            data = Strain.objects.all()
            print(data)
            return(data)
        
        except:
            return Response(
                {'error': 'Sometinhg went wrong while registering.'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class putToDB(APIView):
    def post(self, request):
        data = request.data['cart']

        for entry in data:
            # print(entry)
            # print("\n\n\n\n\n\n\n")
            serializer = StrainSerializer(data=entry)
            if serializer.is_valid():
                strain = serializer.save()
                print(strain.id)
            for culno in entry['culcolno'].split(","):
                serializer = CulColNoSerializer(data={'strain': strain.id, 'cn' : culno.strip()})
                if serializer.is_valid():
                    culno = serializer.save()
                    print(culno.id)
                else: print(serializer.errors)
            else: print(serializer.errors)


        return Response(
            {'success': 'Succ', 'data' : data},
            status = status.HTTP_200_OK
        )

        # try:
        #     data = json.loads(request.data["load"])
        #     print(data)
        #     return Response(
        #         {'success': 'Succ'},
        #         status = status.HTTP_200_OK
        #     )
        
        # except:
        #     return Response(
        #         {'error': 'Sometinhg went wrong while registering.'},
        #         status = status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )
    
class StrainViewSet(ModelViewSet):
    queryset = Strain.objects.all()
    serializer_class = StrainSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

    def update(self, request, pk):
        strain = Strain.objects.get(pk=pk)
        data = request.data['cart'][0]

        strain.domain = data["domain"]
        strain.phylum = data["phylum"]
        strain.tax_class = data["tax_class"]
        strain.tax_order = data["tax_order"]
        strain.family = data["family"]
        strain.genus = data["genus"]
        strain.sci_name = data["sci_name"]
        strain.strain_desc = data["strain_desc"]
        strain.species = data["species"]
        
        strain.is_type_strain = True
        if(data["is_type_strain"] == "no") : strain.is_type_strain = False

        strain.is_bacdive = True
        if(data["is_bacdive"] == "no") : strain.is_bacdive = False

        strain.strain_hist = data["strain_hist"]

        strain.save()
        serializer=StrainSerializer(strain)
        return(Response(serializer.data))

class CCNViewSet(ModelViewSet):
    queryset = Cul_coll_no.objects.all()
    serializer_class = CulColNoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','strain']