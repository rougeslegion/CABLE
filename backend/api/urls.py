from django.urls import path
from .views import (
    TestView,
    bacdiveView,
    getData,
    putToDB,
    StrainViewSet,
    CCNViewSet
)

urlpatterns = [
    #path('test/', TestView.as_view(), name = 'test'),
    path('test/', bacdiveView.as_view(), name = 'test'),
    path('data/', getData.as_view(), name = 'data'),
    path('store/', putToDB.as_view(), name = 'store'),
    path('strains/', StrainViewSet.as_view({'get':'list'}), name = "strains"),
    path('strains/<int:pk>', StrainViewSet.as_view({'delete':'destroy', 'put':'update'}), name = "strains"),
    path('ccn/', CCNViewSet.as_view({'get':'list','delete':'destroy'}), name = "ccns")
]