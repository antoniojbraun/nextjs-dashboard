'use client'; // componente de cliente.

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  useSearchParams,
  useRouter,
  usePathname,
} from '@/node_modules/next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Aqui abaixo usamos a função useDebouncedCallback com nossa função handleSearch para tratar a digitação
  // demasiada do teclado do usuário.
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    // aqui estamos verificando se existe alguma informação no campo de busca, caso houver ele vai setar na instancia
    // de URLSearchParams, caso não houver, ele deleta tudo.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`); // aqui ele vai pegar o endereço da URL + o contéudo que está em params e jogar na URL.
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query'?.toString)} // aqui ele pega o que está parametro query e transforma em texto.
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
