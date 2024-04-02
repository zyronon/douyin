import SlideAlbum from '@/components/slide/SlideAlbum.vue'
import SlideUser from '@/components/slide/SlideUser.vue'
import BVideo from '@/components/slide/BVideo.vue'

export function useSlideListItemRender(props) {
  return function render(item, index, play, uniqueId) {
    // console.log('item', item)
    let node
    switch (item.type) {
      case 'img':
        node = <img src={item.src} style="height:100%;" alt={''} />
        break
      case 'imgs':
        node = <SlideAlbum isPlay={play} index={index} position={{ uniqueId, index }} {...props} />
        break
      case 'user':
        node = <SlideUser {...props} />
        break
      case 'send-video':
        node = <video src={item.src} style="height:100%;" />
        break
      default:
        node = (
          <BVideo
            isPlay={play}
            item={item}
            index={index}
            position={{ uniqueId, index }}
            {...props}
          />
        )
        break
    }
    return node
  }
}
