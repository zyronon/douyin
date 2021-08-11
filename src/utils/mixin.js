import globalMethods from "./global-methods";
import BaseHeader from "../components/BaseHeader";
import SlideList from "../components/slide/SlideList";
import SlideRowList from "../components/slide/SlideRowList";
import SlideColumnList from "../components/slide/SlideColumnList";
import SlideItem from "../components/slide/SlideItem";
import Indicator from "../components/Indicator";
import Video from "../components/Video";
import Footer from "../components/Footer";
import Mask from "../components/Mask";
import NoMore from "../components/NoMore";
import Back from "../components/Back";
import Loading from "../components/Loading";

export default {
  components: {
    BaseHeader,
    SlideList,
    SlideRowList,
    SlideColumnList,
    SlideItem,
    Indicator,
    'Video1':Video,
    Footer,
    Mask,
    NoMore,
    Back,
    Loading
  },
  data() {
    return {
      SUCCESS_CODE: 200
    }
  },
  methods: {
    ...globalMethods
  }
}