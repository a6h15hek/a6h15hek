" Your existing configuration (lines 1-21)
call plug#begin('~/.vim/plugged')
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'scrooloose/nerdtree'
call plug#end()

let g:airline_powerline_fonts = 1
set rtp+=/usr/local/opt/fzf

let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

colorscheme onedark
syntax on
set number
highlight Normal ctermbg=None
highlight LineNr ctermfg=DarkGrey

" ========== NERDTree Enhancements ==========
" Toggle NERDTree with Ctrl+n
nnoremap <C-n> :NERDTreeToggle<CR>

" Find current file in NERDTree
nnoremap <leader>f :NERDTreeFind<CR>

" Close NERDTree when it's the last window
autocmd BufEnter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" Show NERDTree status in airline
let g:airline#extensions#nerdtree#enabled = 1
let g:airline#extensions#nerdtree#show_text = 1

" Custom NERDTree statusline with shortcuts
function! NERDTreeStatusline()
    let shortcuts = '["o=open", "i=split", "s=vsplit", "t=newtab", "m=menu"]'
    return shortcuts . ' ' . g:NERDTreeStatusline
endfunction

let g:NERDTreeStatusline = '%{exists("b:NERDTreeRoot")?b:NERDTreeRoot.path._strForUI():""}'
let g:NERDTreeMinimalUI = 0
let g:NERDTreeShowHelp = 1  " Show help at top

" Show current key mappings in statusline
set statusline=
set statusline+=%{NERDTreeStatusline()}
set statusline+=%=
set statusline+=%{get(g:,'NERDTreeFileNode','')}
