import SlideAlbum from "@/components/slide/SlideAlbum.vue";
import SlideUser from "@/components/slide/SlideUser.vue";
import BVideo from "@/components/slide/BVideo.vue";

export function useSlideListItemRender(props) {
  return function render(item, index, play, uniqueId) {
    // console.log('item', item)
    let node
    if (item.type === 'img') {
      node = <img src={item.src} style="height:100%;"/>
    }
    if (item.type === 'imgs') {
      node = <SlideAlbum/>
    }
    if (item.type === 'user') {
      node = <SlideUser  {...props}/>
    }
    if (item.type === 'send-video') {
      node = <video src={item.src} style="height:100%;"/>
    }
    // onGoUserInfo={() => cb('onGoUserInfo')}
    if (item.type === 'recommend-video') {
      node = <BVideo
          isPlay={play}
          item={item}
          index={index}
          position={{uniqueId, index}}
          {...props}
      />
    }
    return node
  }
}