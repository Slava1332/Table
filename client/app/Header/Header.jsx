import './Header.css'

export default function Header(){
    return (
        <div className='header-container'>
            <div className='page-container'>
                <div className='page-container-item'>Главная</div>
                <div className='page-container-item'>Таблица</div>
                <div className='page-container-item'>Подписка</div>
                <div className='page-container-item'>Поддержка</div>
                <div className='page-container-item'>FAQ</div>
            </div>
            <div className='profile-container'>
                <div className='profile-item user-name'>Полкан</div>
                <div className='profile-item-small'>

                    <div className='profile-item balance'>0 руб.</div>
                    <div className='profile-item type-sub'>null</div>
                </div>
                <img className='profile-item Steam-profile' src='https://avatars.cloudflare.steamstatic.com/26893ff7fe34a56b5d3181d683974ce4b38439e6_full.jpg'/>
                

            </div>
        </div>
    )
}