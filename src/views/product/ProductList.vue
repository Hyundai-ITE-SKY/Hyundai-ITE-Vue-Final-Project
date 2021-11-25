<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div>
      <v-breadcrumbs :items="category" class="justify-center">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div>
      <v-row no-gutters>
        <v-col align-self="auto" v-for="item in products" :key="item.pno" cols="6">
          <div class>
            <product-item
              :bname="item.bname"
              :pname="item.pname"
              :pprice="item.pprice.toLocaleString() + '원'"
              :colors="item.colors"
            ></product-item>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: { ProductItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      products: [
        {
          pid: "MW2B3TTO013E5A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4104,
          pname: "슬리브리스 티셔츠",
          pprice: 58000,
          pdetail:
            "슬림한 실루엣의 이 티셔츠는 리브 텍스처로 이루어져 매우 편안한 착용감을 선사합니다. 슬리브리스 디자인으로 단품으로 혹은 이너로도 활용도 높은 아이템입니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO013E5A",
              ccolorcode: "BK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_BK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_BK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_BK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_BK_C01.jpg",
              cmatchpid: "MW2B3NPC091W_LE",
            },
            {
              pid: "MW2B3TTO013E5A",
              ccolorcode: "KK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_KK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_KK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_KK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_KK_C01.jpg",
              cmatchpid: "MW2B3NPC010E4A_WT",
            },
            {
              pid: "MW2B3TTO013E5A",
              ccolorcode: "WT",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_WT_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_WT_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_WT_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO013E5A_WT_C01.jpg",
              cmatchpid: "MW2B3NPC091W_LE",
            },
          ],
        },
        {
          pid: "MW2B3TTO014E5A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4105,
          pname: "[21SS] 린넨 카프탄 티셔츠",
          pprice: 99540,
          pdetail:
            "돌먼 소매의 여유로운 실루엣으로 루즈한 카프탄 스타일을 선보이는 티셔츠입니다. 넥라인 버튼의 여밈 유무에 따라 다른 느낌을 연출할 수 있으며, 소재 특유의 자연스러운 질감이 돋보입니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO014E5A",
              ccolorcode: "LE",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_LE_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_LE_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_LE_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_LE_C01.jpg",
              cmatchpid: "MW2B3WPC816W_BS",
            },
            {
              pid: "MW2B3TTO014E5A",
              ccolorcode: "NY",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_NY_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_NY_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_NY_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO014E5A_NY_C01.jpg",
              cmatchpid: "MW2B3WPC019E5A_BK",
            },
          ],
        },
        {
          pid: "MW2B3TTO015E5A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4106,
          pname: "돌먼 슬리브 린넨 티셔츠",
          pprice: 138000,
          pdetail:
            "돌먼 슬리브 디자인으로 여유로운 실루엣을 한층 강조해 주며, 간결한 디자인으로 어디에나 두루 어울리는 티셔츠입니다. 100% 린넨 소재로 특유의 내추럴한 분위기와 함께 가볍고 편안한 착용감을 선사합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO015E5A",
              ccolorcode: "GN",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_GN_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_GN_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_GN_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_GN_C01.jpg",
              cmatchpid: "MW2B1NPC001E1P_IV",
            },
            {
              pid: "MW2B3TTO015E5A",
              ccolorcode: "WT",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_WT_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_WT_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_WT_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5A_WT_C01.jpg",
              cmatchpid: "MW2B1NPC002E1P_BK",
            },
          ],
        },
        {
          pid: "MW2B3TTO015E5E",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4107,
          pname: "돌먼 슬리브 린넨 티셔츠",
          pprice: 138000,
          pdetail:
            "돌먼 슬리브 디자인으로 여유로운 실루엣을 한층 강조해 주며, 간결한 디자인으로 어디에나 두루 어울리는 티셔츠입니다. 100% 린넨 소재로 특유의 내추럴한 분위기와 함께 가볍고 편안한 착용감을 선사합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO015E5E",
              ccolorcode: "BK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_BK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_BK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_BK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_BK_C01.jpg",
              cmatchpid: "MW2B3NPC010E4A_WT",
            },
            {
              pid: "MW2B3TTO015E5E",
              ccolorcode: "PK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_PK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_PK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_PK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO015E5E_PK_C01.jpg",
              cmatchpid: "MW2B1NPC002E1P_BL",
            },
          ],
        },
        {
          pid: "MW2B3TTO016E5A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4108,
          pname: "[21SS] 백 스쿱넥 티셔츠",
          pprice: 80640,
          pdetail:
            "뒷 넥라인이 넓게 파인 스쿱넥 디자인의 티셔츠로 부분적으로 봉제 라인이 더해져 캐주얼하게 완성했습니다. 슬림한 실루엣이며, 매우 부드럽고 신축성이 좋은 소재로 편안한 착용감을 자랑합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO016E5A",
              ccolorcode: "BK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_BK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_BK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_BK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_BK_C01.jpg",
              cmatchpid: "MW2B3NPC091W_LE",
            },
            {
              pid: "MW2B3TTO016E5A",
              ccolorcode: "PK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_PK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_PK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_PK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO016E5A_PK_C01.jpg",
              cmatchpid: "MW2B3NPC091W_DG",
            },
          ],
        },
        {
          pid: "MW2B3TTO017E5E",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4109,
          pname: "[21SS] 돌먼 슬리브 티셔츠",
          pprice: 110600,
          pdetail:
            "허리 앞뒤에 턱을 잡아 볼륨감 있는 실루엣을 연출한 티셔츠로 간결하면서도 페미닌한 스타일을 선보입니다. 적당한 두께감의 소재가 실루엣을 유지해 주며, 부드럽고 편안한 착용감이 돋보입니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO017E5E",
              ccolorcode: "NY",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO017E5E_NY_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO017E5E_NY_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO017E5E_NY_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO017E5E_NY_C01.jpg",
              cmatchpid: "MW2B3WSC706W_WT",
            },
          ],
        },
        {
          pid: "MW2B3TTO019E6E",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4110,
          pname: "[21SS] 노트 헴 슬리브리스 티셔츠",
          pprice: 99540,
          pdetail:
            "앞뒤로 리브 텍스처의 방향을 다르게 한 이 티셔츠는 깔끔하지만 평범하지 않은 디자인을 선보입니다. 앞면 밑단의 매듭지어 입체감 있게 연출한 디테일로 룩을 한층 세련되게 완성합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO019E6E",
              ccolorcode: "BK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6E_BK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6E_BK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6E_BK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6E_BK_C01.jpg",
              cmatchpid: "MW2B1WSC704W_BG",
            },
          ],
        },
        {
          pid: "MW2B3TTO019E6H",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4111,
          pname: "[21SS] 노트 헴 슬리브리스 티셔츠",
          pprice: 99540,
          pdetail:
            "앞뒤로 리브 텍스처의 방향을 다르게 한 이 티셔츠는 깔끔하지만 평범하지 않은 디자인을 선보입니다. 앞면 밑단의 매듭지어 입체감 있게 연출한 디테일로 룩을 한층 세련되게 완성합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO019E6H",
              ccolorcode: "LB",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6H_LB_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6H_LB_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6H_LB_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO019E6H_LB_C01.jpg",
              cmatchpid: "MW2B3WPC016E5A_BK",
            },
          ],
        },
        {
          pid: "MW2B3TTO550W",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4112,
          pname: "라운드넥 티셔츠",
          pprice: 118000,
          pdetail:
            "레귤러 핏의 라운드넥 티셔츠입니다. 에센셜한 디자인과 솔리드 컬러로 어디에나 두루 활용하기 좋은 데일리 아이템입니다. 유독 부드러운 소재감이 돋보입니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO550W",
              ccolorcode: "DK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_DK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_DK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_DK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_DK_C01.jpg",
              cmatchpid: "MW2B3WSC706W_WT",
            },
            {
              pid: "MW2B3TTO550W",
              ccolorcode: "LE",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LE_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LE_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LE_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LE_C01.jpg",
              cmatchpid: "MW2B1WSC704W_BG",
            },
            {
              pid: "MW2B3TTO550W",
              ccolorcode: "LV",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LV_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LV_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LV_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO550W_LV_C01.jpg",
              cmatchpid: "MW2B3WSC706W_WT",
            },
          ],
        },
        {
          pid: "MW2B3TTO551W",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "T-Shirts",
          pno: 4113,
          pname: "[21SS] 레이스 블록 티셔츠",
          pprice: 158000,
          pdetail:
            "언뜻 클래식한 티셔츠처럼 보이지만 뒷면에 레이스 소재를 블록하여 반전된 무드를 선사합니다. 밑단으로 갈수록 퍼지는 실루엣이며, 뒷면 하단 양 옆에 셔링을 봉제하여 플레어 지는 디자인이 로맨틱하고 페미닌한 분위기를 더합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3TTO551W",
              ccolorcode: "BK",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_BK_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_BK_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_BK_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_BK_C01.jpg",
              cmatchpid: "MW2B3NPC802W_NY",
            },
            {
              pid: "MW2B3TTO551W",
              ccolorcode: "WT",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_WT_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_WT_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_WT_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3TTO551W_WT_C01.jpg",
              cmatchpid: "MW2B3NPC802W_GE",
            },
          ],
        },
        {
          pid: "MW2B3WDR020E5A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "DRESS",
          csmall: "MIDI DRESS",
          pno: 4114,
          pname: "[21SS] 스트라이프 턱 드레스",
          pprice: 212940,
          pdetail:
            "실키한 텍스처에 톤온톤으로 배색한 스트라이프 패턴이 더해져 청량한 분위기가 물씬 풍깁니다. 상단에 턱을 잡아 봉제하여 밑단이 한층 풍성하며, 언밸런스한 디자인으로 실루엣을 드라마틱하게 연출합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3WDR020E5A",
              ccolorcode: "SR",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5A_SR_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5A_SR_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5A_SR_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5A_SR_C01.jpg",
              cmatchpid: "MW2A9AJW015ENA_GD",
            },
          ],
        },
        {
          pid: "MW2B3WDR020E5E",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "DRESS",
          csmall: "MIDI DRESS",
          pno: 4115,
          pname: "[21SS] 솔리드 턱 드레스",
          pprice: 212940,
          pdetail:
            "심플한 솔리드 컬러로 세련된 분위기를 선사합니다. 상단에 턱을 잡아 봉제하여 밑단이 한층 풍성하며, 언밸런스한 디자인으로 실루엣을 드라마틱하게 연출합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3WDR020E5E",
              ccolorcode: "NY",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5E_NY_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5E_NY_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5E_NY_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WDR020E5E_NY_C01.jpg",
              cmatchpid: "MW2A9AJW015ENA_GD",
            },
          ],
        },
      ],
      category: [
        {
          text: "대분류",
          disabled: false,
          href: "list",
        },
        {
          text: "중분류",
          disabled: false,
          href: "list",
        },
        {
          text: "소분류",
          disabled: true,
          href: "list",
        },
      ],
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>
