<?php

function safeurl($url, $replace = [], $delimiter = '_')
{
    if (!empty($replace)) {
        $url = str_replace((array)$replace, ' ', $url);
    }

    $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $url);
    $clean = preg_replace('/[^a-zA-Z0-9\/_|+ -]/', '', $clean);
    $clean = strtolower(trim($clean, '-'));
    $clean = preg_replace('/[\/_|+ -]+/', $delimiter, $clean);

    return $clean;
}
